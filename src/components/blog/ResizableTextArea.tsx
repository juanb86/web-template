import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { type CreatePostInput } from "~/schemas/post.schema";
import { useAutosizeTextArea } from "~/utils/front";
import { ShowErrorMsg } from "../ui/errors";

export const ResizableTextArea = ({
  name,
  placeholder,
  className,
}: {
  name: keyof CreatePostInput;
  placeholder: string;
  className: string;
}) => {
  const refVar = useRef<HTMLTextAreaElement | null>(null);

  const { register, watch, getFieldState } = useFormContext<CreatePostInput>();

  const { ref, ...registerTitle } = register(name);

  const value = watch(name);

  useAutosizeTextArea(refVar.current, value);

  const { error } = getFieldState(name);

  return (
    <div className="relative">
      <ShowErrorMsg errorMsg={error?.message} />
      <textarea
        rows={1}
        placeholder={placeholder}
        className={className}
        ref={(e) => {
          ref(e);
          refVar.current = e;
        }}
        {...registerTitle}
      />
    </div>
  );
};
