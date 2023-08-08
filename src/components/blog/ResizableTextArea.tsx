import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { type CreatePostInput } from "~/schemas/post.schema";
import { useAutosizeTextArea } from "~/utils/front";

export const ResizableTextArea = ({
  name,
  placeholder,
  className,
}: {
  name: keyof CreatePostInput;
  placeholder: string;
  className: string;
}) => {
  const refTitleVar = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreatePostInput>();

  const { ref: refTitle, ...registerTitle } = register(name);

  const value = watch(name);

  useAutosizeTextArea(refTitleVar.current, value);

  const error = errors?.[name]?.message;

  return (
    <div className="relative">
      {error && (
        <div className="absolute bottom-full left-0 z-50 mb-1 rounded-sm bg-red-500 px-2 text-white opacity-90 after:absolute after:left-1/2 after:top-full after:-ml-1 after:border-4 after:border-solid after:border-transparent after:border-t-red-500">
          <p>{error}</p>
        </div>
      )}
      <textarea
        rows={1}
        placeholder={placeholder}
        className={className}
        ref={(e) => {
          refTitle(e);
          refTitleVar.current = e;
        }}
        {...registerTitle}
      />
    </div>
  );
};
