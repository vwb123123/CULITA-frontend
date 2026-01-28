import { httpClient } from "./axios";
import type { UploadResponse } from "../types/upload.ts";

export const uploadImage = async (
    file: File,
    folder: string = "uploads",
): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await httpClient.post<UploadResponse>(
        "/uploads",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );
    return response.data.url;
};
