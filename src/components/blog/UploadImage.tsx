import { ImageIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

export default function UploadImage() {
  const { compressImage, handleCompressImage } = useCompressImage();

  return (
    <div
      className="relative flex aspect-[9/6] w-full items-center justify-center overflow-hidden bg-foreground bg-cover bg-center"
      style={{ backgroundImage: compressImage ? `url(${compressImage})` : "" }}
    >
      {!compressImage && <ImageIcon className="mb-4 h-20 w-20 text-primary" />}
      <div className="absolute bottom-0 left-0 m-2 flex gap-2">
        <Input type="file" accept="image/*" onChange={handleCompressImage} />
      </div>
    </div>
  );
}

function useCompressImage(): {
  compressImage: string | null;
  handleCompressImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
} {
  const { setValue } = useFormContext();
  const [compressImage, setCompressImage] = useState<string | null>(null);

  const handleCompressImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const [file] = files;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const sx = 0;
        const sy = 0;
        const totalPixels = img.width * img.height;
        if (totalPixels > 1500000) {
          const scaleFactor = img.width / img.height;
          width = Math.round(Math.sqrt(scaleFactor * 1500000));
          if (width % 2 !== 0) width -= 1;
          height = Math.round(1500000 / width);
          if (height % 2 !== 0) height -= 1;
        }

        // COMPRIMIR IMAGEN
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext("2d");
        if (!ctx) return;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, sx, sy, img.width, img.height, 0, 0, width, height);
        const data = ctx.canvas.toDataURL("image/webp");

        setValue("imageURL", data);
        setCompressImage(data);
      };
    };
  };

  return {
    compressImage,
    handleCompressImage,
  };
}
