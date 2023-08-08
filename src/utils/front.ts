import { useEffect } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Updates the height of a <textarea> when the value changes.
export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null | undefined;
}

interface ResponseExtended<T> extends Response {
  bodyJson?: T;
}

export async function fetchData<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ResponseExtended<T>> {
  try {
    const response = await window.fetch(endpoint, options);

    console.log("response in hook: ", response);

    if (response.ok) {
      const bodyJson = (await response.json()) as T;

      return { ...response, bodyJson };
    } else {
      return response;
    }
  } catch (response) {
    return response as Response;
  }
}

interface FetchCloudinaryI {
  data?: CloudinaryResponseData;
  error?: {
    status: number;
    message: string;
  };
}

export async function fetchCloudinary({
  imageData,
  preset,
  cloud,
}: {
  imageData: string;
  preset: string;
  cloud: string;
}): Promise<FetchCloudinaryI> {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", preset);

  const response = await fetchData<CloudinaryResponseData>(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (response.ok === false || !response.bodyJson) {
    return { error: { status: response.status, message: response.statusText } };
  } else {
    return { data: response.bodyJson };
  }
}

interface CloudinaryResponseData {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
}
