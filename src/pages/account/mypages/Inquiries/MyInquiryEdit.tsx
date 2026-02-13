import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { useNavigate, useParams } from "react-router";
import type { InquiryType } from "../../../../types/Inquiries.ts";
import {
    getInquiryById,
    updateInquiry,
} from "../../../../api/Inquiries.api.ts";
import Spinner from "../../../../components/common/Spinner.tsx";
import { FontSize, MenuBar } from "./MyInquiryWrite.tsx";

function MyInquiryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [type, setType] = useState<InquiryType>("PRODUCT");
    const [isLoading, setIsLoading] = useState(true);

    const editor = useEditor({
        extensions: [StarterKit, TextStyle, FontFamily, FontSize],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none min-h-[400px] max-w-none p-8 bg-white",
            },
        },
    });

    useEffect(() => {
        const fetchOriginalData = async () => {
            if (!id) return;
            try {
                const response = await getInquiryById(Number(id));
                const actualData = response.data;

                if (!actualData) return;
                if (actualData.status === "ANSWERED") {
                    alert("답변이 완료된 문의는 수정할 수 없습니다.");
                    navigate(-1);
                    return;
                }
                setTitle(actualData.title);
                setType(actualData.type);

                if (editor && actualData.content) {
                    editor.commands.setContent(actualData.content);
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                alert("기존 내용을 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        if (editor) {
            fetchOriginalData().then(() => {});
        }
    }, [id, editor, navigate]);

    const handleUpdate = async () => {
        if (!title.trim()) return alert("제목을 입력해주세요.");
        const contentText = editor?.getText().trim() || "";

        if (contentText.length < 10) {
            return alert("내용을 10자 이상 입력해주세요.");
        }

        try {
            await updateInquiry(Number(id), {
                id: Number(id),
                title,
                type,
                content: editor?.getHTML() || "",
                imageUrls: [],
            });
            alert("수정이 완료되었습니다.");
            navigate(`/mypage/inquiry/${id}`);
        } catch (error) {
            console.error(error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    if (isLoading) return <Spinner full />;

    return (
        <div className="max-w-[1168px] mx-auto px-4 mb-20">
            <div className="my-10">
                <h2 className="text-[20px] font-bold">문의 수정하기</h2>
                <p className="text-gray-500 text-[13px] mt-2">
                    기존에 작성하신 내용을 수정하신 후 '수정 완료' 버튼을
                    눌러주세요.
                </p>
            </div>
            <div className="border-t border-black">
                {/* 유형 선택 */}
                <div className="flex items-center border-b border-gray-100 py-4">
                    <label className="w-40 font-bold px-4 text-[13px]">
                        유형
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as InquiryType)}
                        className="border border-gray-200 p-2 w-64 outline-none text-[13px]"
                    >
                        <option value="PRODUCT">상품</option>
                        <option value="DELIVERY">배송</option>
                        <option value="EXCHANGE_RETURN">교환/반환</option>
                        <option value="MEMBER">회원</option>
                        <option value="OTHER">기타</option>
                    </select>
                </div>

                {/* 제목 입력 */}
                <div className="flex items-center border-b border-gray-100 py-4">
                    <label className="w-40 font-bold px-4 text-[13px]">
                        제목
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 border border-gray-200 p-2 outline-none text-[13px]"
                    />
                </div>

                {/* Tiptap 에디터 영역 */}
                <div className="mt-8 border border-gray-200 rounded-sm overflow-hidden">
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                <div className="flex justify-center gap-2 mt-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-48 py-4 border border-gray-200 text-[13px] uppercase"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="w-48 py-4 bg-black text-white text-[13px] font-bold hover:bg-[#ff4600] uppercase"
                    >
                        수정 완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyInquiryEdit;
