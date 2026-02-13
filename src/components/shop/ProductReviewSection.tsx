import {
    useEffect,
    useState,
    useCallback,
    useRef,
    type ChangeEvent,
} from "react";
import { twMerge } from "tailwind-merge";
import type {
    Review,
    ReviewQueryParams,
    CreateReviewRequest,
    ReviewImage,
    UpdateReviewRequest,
} from "../../types/review.ts";
import {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../../api/review.api.ts";
import { getOrders } from "../../api/order.api.ts";
import {
    FaRegStar,
    FaStar,
    FaCamera,
    FaTimes,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import Spinner from "../common/Spinner.tsx";
import type { Order, OrderItem } from "../../types/order.ts";
import { uploadImage } from "../../api/upload.api.ts";
import useAuthStore from "../../store/useAuthStore.ts";

interface Props {
    productId: number;
}

type SortType = "최신순" | "별점순";

function ProductReviewSection({ productId }: Props) {
    const { user: currentUser } = useAuthStore();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [sortType, setSortType] = useState<SortType>("최신순");

    const [hasPurchased, setHasPurchased] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 리뷰 작성/수정 상태
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [newContent, setNewContent] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchProductReviews = useCallback(async () => {
        setIsLoading(true);
        try {
            const params: ReviewQueryParams = {
                productId,
                page: 1,
                limit: 100,
            };
            const response = await getProductReviews(params);
            const reviewData: Review[] = response.data || [];

            const sortedData = [...reviewData].sort((a, b) => {
                if (sortType === "최신순") {
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                }
                return b.rating - a.rating;
            });

            setReviews(sortedData);
            setTotalCount(response.pagination?.total || 0);

            if (currentUser?.id) {
                const userId = Number(currentUser.id);
                setHasReviewed(
                    sortedData.some((r) => Number(r.user?.id) === userId),
                );
            }
        } catch (error) {
            console.error("리뷰 로드 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [productId, sortType, currentUser?.id]);

    useEffect(() => {
        fetchProductReviews();

        getOrders({ page: 1, limit: 100 })
            .then((res) => {
                let orders: Order[] = [];

                // 타입 가드: res가 배열인지 혹은 data 속성을 가진 객체인지 확인
                const responseData = res as unknown as
                    | { data: Order[] | { data: Order[] } }
                    | Order[];

                if (Array.isArray(responseData)) {
                    orders = responseData;
                } else if (responseData && typeof responseData === "object") {
                    if ("data" in responseData) {
                        if (Array.isArray(responseData.data)) {
                            orders = responseData.data;
                        } else if (
                            responseData.data &&
                            "data" in responseData.data
                        ) {
                            orders = responseData.data.data as Order[];
                        }
                    }
                }

                const targetId = Number(productId);
                const purchased = orders.some((order) =>
                    order.items?.some(
                        (item: OrderItem) =>
                            Number(item.productId || item.product?.id) ===
                            targetId,
                    ),
                );
                setHasPurchased(purchased);
            })
            .catch((err) => console.error("주문 정보 로드 실패:", err));
    }, [fetchProductReviews, productId]);

    useEffect(() => {
        return () => {
            imagePreviews.forEach((url) => {
                if (url.startsWith("blob:")) URL.revokeObjectURL(url);
            });
        };
    }, [imagePreviews]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + selectedImages.length > 5) {
            return alert("사진은 최대 5장까지 업로드 가능합니다.");
        }
        setSelectedImages((prev) => [...prev, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const target = imagePreviews[index];
        if (target.startsWith("blob:")) URL.revokeObjectURL(target);

        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEditClick = (review: Review) => {
        setEditingReviewId(review.id);
        setNewRating(review.rating);
        setNewContent(review.content || "");
        setImagePreviews(review.images?.map((img) => img.url) || []);
        setSelectedImages([]);
        setIsModalOpen(true);
    };

    const handleDeleteReview = async (id: number) => {
        if (!window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) return;
        try {
            await deleteReview(id);
            alert("삭제되었습니다.");
            fetchProductReviews();
        } catch (error) {
            console.log(error);
            alert("리뷰가 삭제에 실패했습니다.");
        }
    };

    const handleSubmitReview = async () => {
        if (newRating === 0) return alert("별점을 선택해주세요.");
        if (newContent.trim().length < 10)
            return alert("내용을 10자 이상 입력해주세요.");

        setIsLoading(true);
        try {
            // 1. 새 파일들만 업로드
            const uploadPromises = selectedImages.map((file) =>
                uploadImage(file, "reviews"),
            );
            const newUploadedUrls = await Promise.all(uploadPromises);

            // 2. 기존 URL(수정 시 유지한 것) + 새로 업로드된 URL
            const finalImageUrls = [
                ...imagePreviews.filter((url) => !url.startsWith("blob:")),
                ...newUploadedUrls,
            ];

            if (editingReviewId) {
                const updateData: UpdateReviewRequest = {
                    rating: newRating,
                    content: newContent,
                    imageUrls: finalImageUrls,
                };
                await updateReview(editingReviewId, updateData);
                alert("수정되었습니다.");
            } else {
                const createData: CreateReviewRequest = {
                    productId: Number(productId),
                    rating: newRating,
                    content: newContent,
                    imageUrls: finalImageUrls,
                };
                await createReview(createData);
                alert("등록되었습니다.");
            }

            setIsModalOpen(false);
            resetForm();
            fetchProductReviews();
        } catch (error) {
            console.error(error);
            alert("처리 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEditingReviewId(null);
        setNewRating(0);
        setNewContent("");
        setSelectedImages([]);
        setImagePreviews([]);
    };

    console.log("리뷰 원본 데이터 1번:", reviews[0]);
    return (
        <div
            id="review"
            className="max-w-[1200px] mx-auto mt-20 border-t border-gray-200 py-16 px-4"
        >
            <div className="text-center mb-12">
                <h3 className="text-[18px] font-bold mb-4 uppercase tracking-wider">
                    상품사용후기
                </h3>
                <div className="flex flex-col items-center justify-center border-y border-gray-100 py-10 bg-gray-50/30">
                    <div className="text-[#ff4600] text-4xl mb-2 flex items-center gap-2">
                        <FaStar />
                        <span className="text-black font-bold">
                            {(
                                reviews.reduce(
                                    (acc, cur) => acc + cur.rating,
                                    0,
                                ) / (reviews.length || 1)
                            ).toFixed(1)}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-6 flex gap-1">
                        <span className="text-[#ff4600] font-bold">
                            {totalCount}
                        </span>
                        <span>개 리뷰</span>
                    </div>
                    {hasPurchased && (
                        <button
                            onClick={() => {
                                if (hasReviewed)
                                    return alert("이미 리뷰를 작성하셨습니다.");
                                setIsModalOpen(true);
                            }}
                            className="bg-[#ff4600] text-white px-10 py-3.5 text-[13px] font-bold hover:bg-black transition-all"
                        >
                            리뷰작성
                        </button>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-black mb-6">
                <span className="text-sm font-bold">리뷰 {totalCount}</span>
                <div className="flex gap-4 text-[12px]">
                    <button
                        onClick={() => setSortType("최신순")}
                        className={twMerge(
                            sortType === "최신순"
                                ? "text-black font-bold"
                                : "text-gray-400",
                        )}
                    >
                        최신순
                    </button>
                    <button
                        onClick={() => setSortType("별점순")}
                        className={twMerge(
                            sortType === "별점순"
                                ? "text-black font-bold"
                                : "text-gray-400",
                        )}
                    >
                        별점순
                    </button>
                </div>
            </div>

            {isLoading ? (
                <Spinner full />
            ) : (
                <div className="divide-y divide-gray-100">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="py-12 flex flex-col md:flex-row gap-10"
                        >
                            <div className="w-full md:w-[150px] flex-shrink-0">
                                <p className="text-[13px] font-bold text-gray-900">
                                    {review.user.name}
                                </p>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[10px] text-gray-500 font-medium">
                                    구매 인증
                                </span>

                                {/* ✅ 날짜 출력: YYYY-MM-DD 형식 */}
                                <p className="text-[11px] text-gray-400 mt-2">
                                    {new Date(review.createdAt)
                                        .toLocaleDateString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })
                                        .replace(/\. /g, "-")
                                        .replace(".", "")}{" "}
                                    작성
                                </p>

                                {/* 수정/삭제 버튼 영역 */}
                                {currentUser?.id &&
                                (Number(currentUser.id) ===
                                    Number(
                                        (review as Review & { userId?: number })
                                            .userId,
                                    ) ||
                                    Number(currentUser.id) ===
                                        Number(review.user?.id)) ? (
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() =>
                                                handleEditClick(review)
                                            }
                                            className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1 text-[11px]"
                                            title="수정"
                                        >
                                            <FaEdit size={12} /> 수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteReview(review.id)
                                            }
                                            className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-[11px]"
                                            title="삭제"
                                        >
                                            <FaTrash size={12} /> 삭제
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex-1">
                                <div className="flex text-[#ff4600] text-sm mb-4">
                                    {[...Array(5)].map((_, i) =>
                                        i < review.rating ? (
                                            <FaStar key={i} />
                                        ) : (
                                            <FaRegStar key={i} />
                                        ),
                                    )}
                                </div>
                                <div className="text-[14px] text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                                    {review.content}
                                </div>
                                {review.images && review.images.length > 0 && (
                                    <div className="flex flex-wrap gap-3 mt-6">
                                        {review.images.map(
                                            (img: ReviewImage) => (
                                                <img
                                                    key={img.id}
                                                    src={img.url}
                                                    alt="리뷰"
                                                    className="w-32 h-32 md:w-40 md:h-40 object-cover border border-gray-100 rounded-sm cursor-pointer"
                                                    onClick={() =>
                                                        window.open(
                                                            img.url,
                                                            "_blank",
                                                        )
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h4 className="text-[22px] font-bold text-center mb-8 uppercase">
                            {editingReviewId ? "Review Edit" : "Review Write"}
                        </h4>
                        <div className="flex flex-col items-center mb-8">
                            <div className="flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(num)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setNewRating(num)}
                                        className="text-[#ff4600] p-1 transition-transform hover:scale-125"
                                    >
                                        {(hoverRating || newRating) >= num ? (
                                            <FaStar size={36} />
                                        ) : (
                                            <FaRegStar size={36} />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[12px] font-bold mt-2 text-[#ff4600]">
                                {newRating > 0
                                    ? `${newRating}점`
                                    : "별점을 선택해주세요"}
                            </p>
                        </div>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="후기를 남겨주세요."
                            className="w-full h-44 border border-gray-200 p-5 text-sm outline-none focus:border-black resize-none mb-6"
                        />
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="w-20 h-20 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black"
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
                                            alt="preview"
                                            className="w-full h-full object-cover"
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
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className="flex-1 border py-4 text-[13px] font-bold"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="flex-1 bg-black text-white py-4 text-[13px] font-bold hover:bg-[#ff4600]"
                            >
                                {editingReviewId ? "수정완료" : "리뷰작성"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductReviewSection;
