import { ImageIcon } from "@radix-ui/react-icons";
import { type Dispatch, type SetStateAction } from "react";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { type CreatePostInput } from "~/schemas/post.schema";
import { ShowErrorMsg } from "../ui/errors";

export default function SetImage({
  imageURLstate,
  imageLink,
}: {
  imageURLstate: [string | null, Dispatch<SetStateAction<string | null>>];
  imageLink?: string;
}) {
  const [imageURL, setImageURL] = imageURLstate;

  const {
    formState: { errors },
  } = useFormContext<CreatePostInput>();

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    resizeAndSetImage(event, setImageURL);
  };

  const error = errors?.imageURL?.message;

  return (
    <div
      className="relative flex aspect-[9/6] w-full items-center justify-center overflow-hidden bg-foreground bg-cover bg-center"
      style={{ backgroundImage: imageURL ? `url(${imageURL})` : "" }}
    >
      {!imageURL && !imageLink && (
        <div className="relative flex w-full justify-center">
          <ShowErrorMsg errorMsg={error} />
          <ImageIcon className="mb-4 h-20 w-20 text-primary" />
        </div>
      )}
      {!imageURL && imageLink && (
        <div
          className="aspect-[9/6] w-full overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${imageLink})` }}
        />
      )}
      <div className="absolute bottom-0 left-0 m-2 flex gap-2">
        <Input type="file" accept="image/*" onChange={handleImage} />
      </div>
    </div>
  );
}

// This function resizes and compresses an image file selected by the user and sets it as state in React
const resizeAndSetImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImage: Dispatch<SetStateAction<string | null>>
) => {
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

      setImage(data);
    };
  };
};
