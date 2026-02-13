import {
    useEffect,
    useState,
    useCallback,
    useRef,
    type ChangeEvent,
} from "react";
import type { Review } from "../../../types/review.ts";
import {
    getMyReviews,
    deleteReview,
    updateReview,
    createReview,
} from "../../../api/review.api.ts";
import { getOrders } from "../../../api/order.api.ts";
import { useNavigate } from "react-router";
import { FaRegStar, FaStar, FaCamera, FaTimes } from "react-icons/fa";
import Spinner from "../../../components/common/Spinner.tsx";
import { uploadImage } from "../../../api/upload.api.ts";
import type { Order, OrderItem } from "../../../types/order.ts";

type ReviewWithId = Review & { productId?: number };

interface ProductImage {
    url: string;
}
interface ProductCommonInfo {
    name?: string;
    image?: string;
    images?: (string | ProductImage)[];
}

function MyReviewList() {
    const navigate = useNavigate();
    const pendingRef = useRef<HTMLDivElement>(null);

    const [reviews, setReviews] = useState<ReviewWithId[]>([]);
    const [pendingReviews, setPendingReviews] = useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [editingReview, setEditingReview] = useState<ReviewWithId | null>(
        null,
    );
    const [writingProduct, setWritingProduct] = useState<OrderItem | null>(
        null,
    );

    const [editContent, setEditContent] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getProductInfo = (product?: ProductCommonInfo) => {
        const name = product?.name || "상품 정보 없음";
        const images = product?.images;
        let imageUrl = "";
        if (Array.isArray(images) && images.length > 0) {
            const firstImg = images[0];
            imageUrl =
                typeof firstImg === "string" ? firstImg : firstImg.url || "";
        } else if (product?.image) {
            imageUrl = product.image;
        }
        return { name, imageUrl };
    };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const reviewRes = await getMyReviews({ page: 1, limit: 50 });
            const reviewData: ReviewWithId[] = reviewRes.data || [];
            setReviews(reviewData);

            const orderRes = await getOrders({ page: 1, limit: 50 });

            let orders: Order[] = [];
            if (orderRes && orderRes.data) {
                if (Array.isArray(orderRes.data)) {
                    orders = orderRes.data;
                } else if (
                    "data" in orderRes.data &&
                    Array.isArray(orderRes.data.data)
                ) {
                    orders = orderRes.data.data;
                }
            }

            const deliveredWithoutReview: OrderItem[] = [];

            orders.forEach((order) => {
                if (order.status?.toUpperCase() === "DELIVERED") {
                    order.items?.forEach((item) => {
                        const orderProdId = String(
                            item.product?.id || item.productId || "",
                        ).trim();

                        const alreadyReviewed = reviewData.some((r) => {
                            const reviewProdId = String(
                                r.product?.id || r.productId || "",
                            ).trim();
                            return (
                                reviewProdId === orderProdId &&
                                reviewProdId !== ""
                            );
                        });

                        if (!alreadyReviewed && orderProdId !== "") {
                            deliveredWithoutReview.push(item);
                        }
                    });
                }
            });

            setPendingReviews(deliveredWithoutReview);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData().then(() => {});
    }, [fetchData]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (imagePreviews.length + files.length > 5)
            return alert("최대 5장까지 가능합니다.");
        setSelectedFiles((prev) => [...prev, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (editContent.trim().length < 10)
            return alert("10자 이상 작성해주세요.");
        setIsLoading(true);
        try {
            const uploadPromises = selectedFiles.map((file) =>
                uploadImage(file, "reviews"),
            );
            const newUrls = await Promise.all(uploadPromises);
            const finalUrls = [
                ...imagePreviews.filter((url) => !url.startsWith("blob:")),
                ...newUrls,
            ];

            if (editingReview) {
                await updateReview(editingReview.id, {
                    rating: editRating,
                    content: editContent,
                    imageUrls: finalUrls,
                });
                alert("수정되었습니다.");
            } else if (writingProduct) {
                await createReview({
                    productId: Number(
                        writingProduct.productId || writingProduct.product?.id,
                    ),
                    rating: editRating,
                    content: editContent,
                    imageUrls: finalUrls,
                });
                alert("등록되었습니다.");
            }
            closeModal();
            fetchData().then(() => {});
        } catch (error) {
            console.error(error);
            alert("처리 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setEditingReview(null);
        setWritingProduct(null);
        setEditContent("");
        setEditRating(5);
        setImagePreviews([]);
        setSelectedFiles([]);
        setHoverRating(0);
    };

    const handleGoWrite = () => {
        if (pendingReviews.length > 0) {
            pendingRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/products");
        }
    };

    return (
        <div className="max-w-[1168px] mx-auto px-4 md:px-0 py-10">
            {isLoading ? (
                <Spinner full />
            ) : (
                <>
                    {/* 1. 리뷰 작성 가능한 상품 섹션 */}
                    <div ref={pendingRef}>
                        {pendingReviews.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-[18px] font-bold mb-4">
                                    리뷰 작성 가능한 상품{" "}
                                    <span className="text-[#ff4600]">
                                        {pendingReviews.length}
                                    </span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pendingReviews.map((item, idx) => {
                                        const { name, imageUrl } =
                                            getProductInfo(item.product);
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-sm"
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt=""
                                                    className="w-16 h-16 object-cover bg-white border"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-[13px] font-bold truncate max-w-[200px]">
                                                        {name}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400">
                                                        배송 완료 상품
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setWritingProduct(item);
                                                        setEditRating(5);
                                                        setEditContent("");
                                                    }}
                                                    className="bg-black text-white px-4 py-2 text-[12px] font-bold hover:bg-[#ff4600] transition-colors"
                                                >
                                                    리뷰쓰기
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-black pt-10 mb-8 flex justify-between items-end">
                        <h3 className="text-[18px] font-bold">
                            내가 쓴 리뷰{" "}
                            <span className="text-gray-400 font-normal ml-1">
                                {reviews.length}
                            </span>
                        </h3>
                    </div>

                    {reviews.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {reviews.map((review) => {
                                const { name, imageUrl } = getProductInfo(
                                    review.product,
                                );
                                return (
                                    <div
                                        key={review.id}
                                        className="border-b border-gray-100 pb-8 last:border-0"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={imageUrl}
                                                    alt=""
                                                    className="w-14 h-14 object-cover border"
                                                />
                                                <div>
                                                    <p
                                                        onClick={() =>
                                                            navigate(
                                                                `/product/${review.product?.id}`,
                                                            )
                                                        }
                                                        className="text-[14px] font-bold cursor-pointer hover:underline"
                                                    >
                                                        {name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex text-[#ff4600] text-xs">
                                                            {[...Array(5)].map(
                                                                (_, i) =>
                                                                    i <
                                                                    review.rating ? (
                                                                        <FaStar
                                                                            key={
                                                                                i
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <FaRegStar
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="text-gray-200"
                                                                        />
                                                                    ),
                                                            )}
                                                        </div>
                                                        <span className="text-[11px] text-gray-400">
                                                            {new Date(
                                                                review.createdAt,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 text-[11px] text-gray-400">
                                                <button
                                                    onClick={() => {
                                                        setEditingReview(
                                                            review,
                                                        );
                                                        setEditContent(
                                                            review.content ||
                                                                "",
                                                        );
                                                        setEditRating(
                                                            review.rating,
                                                        );
                                                        setImagePreviews(
                                                            review.images?.map(
                                                                (img) =>
                                                                    img.url,
                                                            ) || [],
                                                        );
                                                    }}
                                                    className="hover:text-black underline"
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                "삭제하시겠습니까?",
                                                            )
                                                        )
                                                            deleteReview(
                                                                review.id,
                                                            ).then(() =>
                                                                fetchData(),
                                                            );
                                                    }}
                                                    className="hover:text-red-500 underline"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>
                                        <div className="pl-[72px]">
                                            <p className="text-[13px] text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                                                {review.content}
                                            </p>
                                            <div className="flex gap-2">
                                                {review.images?.map(
                                                    (img, i) => (
                                                        <img
                                                            key={i}
                                                            src={img.url}
                                                            className="w-20 h-20 object-cover rounded-sm border"
                                                            alt=""
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 border-y border-gray-50 bg-gray-50/30">
                            <p className="text-gray-400 text-[14px] mb-6">
                                아직 작성하신 리뷰가 없습니다.
                            </p>
                            <button
                                onClick={handleGoWrite}
                                className="px-8 py-3 bg-white border border-black text-[12px] font-bold hover:bg-black hover:text-white transition-all duration-300"
                            >
                                {pendingReviews.length > 0
                                    ? "리뷰 작성하러 가기"
                                    : "상품 보러 가기"}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* 모달 UI */}
            {(editingReview || writingProduct) && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-xl p-8 md:p-10 shadow-2xl my-auto rounded-sm">
                        <h3 className="font-bold text-xl mb-8 text-center uppercase tracking-widest">
                            {editingReview ? "Edit Review" : "Write Review"}
                        </h3>
                        <div className="flex flex-col items-center mb-8">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onMouseEnter={() => setHoverRating(num)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setEditRating(num)}
                                        className="text-[#ff4600] transition-transform hover:scale-125"
                                    >
                                        {(hoverRating || editRating) >= num ? (
                                            <FaStar size={32} />
                                        ) : (
                                            <FaRegStar
                                                size={32}
                                                className="text-gray-200"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-2 text-[12px] text-gray-400">
                                {hoverRating || editRating} / 5
                            </p>
                        </div>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-40 border border-gray-200 p-5 text-[14px] outline-none focus:border-black resize-none mb-6"
                            placeholder="상품에 대한 솔직한 평을 10자 이상 남겨주세요."
                        />
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="w-20 h-20 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors"
                                >
                                    <FaCamera size={20} />
                                    <span className="text-[10px] mt-1">
                                        {imagePreviews.length}/5
                                    </span>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                />
                                {imagePreviews.map((src, i) => (
                                    <div key={i} className="relative w-20 h-20">
                                        <img
                                            src={src}
                                            alt=""
                                            className="w-full h-full object-cover rounded-sm"
                                        />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                                        >
                                            <FaTimes size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={closeModal}
                                className="flex-1 border py-4 text-[13px] font-bold hover:bg-gray-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="flex-1 bg-black text-white py-4 text-[13px] font-bold hover:bg-[#ff4600] disabled:bg-gray-400"
                            >
                                {isLoading ? "저장 중..." : "저장하기"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyReviewList;
