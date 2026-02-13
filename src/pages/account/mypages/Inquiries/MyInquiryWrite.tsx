/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ChangeEvent, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type {
    CreateInquiryRequest,
    InquiryType,
} from "../../../../types/Inquiries.ts";
import { useNavigate } from "react-router";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-text-style/font-family";
import TextAlign from "@tiptap/extension-text-align";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { Editor } from "@tiptap/react";
import { createInquiry } from "../../../../api/Inquiries.api.ts";
import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}

export const FontSize = Extension.create({
    name: "fontSize",

    addOptions() {
        return { types: ["textStyle"] };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) =>
                            element.style.fontSize.replace(/['"]+/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize: string) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontSize }).run();
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain()
                        .setMark("textStyle", { fontSize: null })
                        .removeEmptyTextStyle()
                        .run();
                },
        };
    },
});

// 툴바 컴포넌트
export const MenuBar = ({ editor }: { editor: Editor }) => {
    if (!editor) return null;

    const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "30px"];

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-[#f9f9f9] sticky top-0 z-10 items-center">
            {/* 폰트 크기 선택 */}
            <select
                onChange={(e) =>
                    editor.chain().focus().setFontSize(e.target.value).run()
                }
                className="border border-gray-300 text-[12px] px-1 h-7 outline-none bg-white"
            >
                <option value="">크기</option>
                {fontSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) =>
                    editor.chain().focus().setFontFamily(e.target.value).run()
                }
                className="border border-gray-300 text-[12px] px-1 outline-none"
            >
                <option value="Inter">기본 글꼴</option>
                <option value="Pretendard">Pretendard</option>
                <option value="Noto Sans KR">Noto Sans</option>
                <option value="serif">바탕체</option>
                <option value="monospace">코드체</option>
            </select>

            {/* 정렬 기능 */}
            <div className="flex gap-1 border-l border-r border-gray-300 px-2 mx-1">
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className={`p-1 px-2 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200 font-bold" : ""}`}
                >
                    <FaAlignLeft />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className={`p-1 px-2 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200 font-bold" : ""}`}
                >
                    <FaAlignCenter />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className={`p-1 px-2 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200 font-bold" : ""}`}
                >
                    <FaAlignRight />
                </button>
            </div>

            {/* 기본 서식 */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="p-1 px-2 font-bold"
            >
                B
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="p-1 px-2 italic"
            >
                I
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline?.().run()}
                className="p-1 px-2 underline"
            >
                U
            </button>
        </div>
    );
};

function MyInquiryWrite() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [type, setType] = useState<InquiryType>("PRODUCT");
    const [files, setFiles] = useState<(File | null)[]>([
        null,
        null,
        null,
        null,
    ]);

    const handleSubmit = async () => {
        if (title.length < 1) return alert("제목을 입력해주세요.");

        const htmlContent = editor?.getHTML() || "";
        const plainText = editor?.getText() || "";
        if (plainText.length < 5) return alert("내용을 5자 이상 입력해주세요.");

        try {
            const requestData: CreateInquiryRequest = {
                type: type,
                title: title,
                content: htmlContent,
                imageUrls: [],
            };

            const result = await createInquiry(requestData);

            if (result) {
                alert("문의가 정상적으로 등록되었습니다.");
                navigate("/mypage/customer-center");
            }
        } catch (error) {
            console.error("등록 실패:", error);
            alert("문의 등록 중 오류가 발생했습니다.");
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontFamily,
            FontSize,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none min-h-[400px] max-w-none p-8 bg-white font-pretendard",
            },
        },
    });

    const handleFileChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files ? e.target.files[0] : null;
        setFiles(newFiles);
    };

    return (
        <div className="max-w-[1168px] mx-auto px-4 mb-20">
            <div className="border-t border-black py-5">
                {/* 상단 입력 필드들 */}
                <div className="flex items-center border-b border-gray-100 py-4 text-[13px]">
                    <label className="w-40 font-bold px-4">유형*</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as InquiryType)}
                        className="border border-gray-200 p-2 w-64 outline-none"
                    >
                        <option value="PRODUCT">상품</option>
                        <option value="DELIVERY">배송</option>
                        <option value="EXCHANGE_RETURN">교환/반품</option>
                        <option value="MEMBER">회원정보</option>
                        <option value="OTHER">기타</option>
                    </select>
                </div>

                <div className="flex items-center border-b border-gray-100 py-4 text-[13px]">
                    <label className="w-40 font-bold px-4">제목*</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 border border-gray-200 p-2 outline-none focus:border-black"
                    />
                </div>

                {/* Tiptap 에디터 */}
                <div className="border border-gray-200 mt-6 rounded-sm">
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                {/* 첨부파일 영역  */}
                <div className="bg-[#fafafa] border-t border-b border-gray-100 mt-10 py-8 px-4">
                    <p className="text-[12px] font-bold mb-4 text-gray-700">
                        첨부파일 (최대 4개)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {files.map((_, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 bg-white p-2 border border-gray-200"
                            >
                                <span className="text-[11px] text-gray-400 w-16">
                                    파일 {idx + 1}
                                </span>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(idx, e)}
                                    className="text-[11px] file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[11px] file:bg-gray-100 file:cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="flex justify-center gap-2 mt-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-48 py-4 border border-gray-200 text-[13px] hover:bg-gray-50 uppercase"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-48 py-4 bg-black text-white text-[13px] font-bold hover:bg-[#ff4600] transition-colors uppercase"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyInquiryWrite;
