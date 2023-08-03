import { useRef } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { type CreatePostInput } from "~/schemas/post.schema";
import useAutosizeTextArea from "~/utils/front";
import UploadImage from "./UploadImage";

export default function CreatePost({
  setAddPost,
}: {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // TODO: implement zod resolver with image upload
  const methods = useForm<CreatePostInput>();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const { mutate, error } = api.post.create.useMutation({
    onSuccess: () => {
      setAddPost(false);
      void ctx.post.getAll.invalidate();
    },
  });

  function onSubmit(values: CreatePostInput) {
    const toSubmit = {
      ...values,
      imageURL:
        "https://res.cloudinary.com/dxozat4y8/image/upload/v1689896892/post-image_cuolxq.jpg",
    };

    console.log(toSubmit);

    mutate(toSubmit);
  }

  const errorData = error && error.data?.zodError?.fieldErrors;

  return (
    <div className="relative m-3  basis-[31%] overflow-hidden rounded-lg bg-white">
      <FormProvider {...methods}>
        <form
          className="flex h-full flex-col items-start "
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
        >
          <UploadImage />
          <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-4">
            <div>
              {errors?.title?.message && (
                <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  {errors.title.message}
                </p>
              )}
              <ResizableTextArea
                name="title"
                placeholder="Post title"
                className="w-full text-2xl font-semibold tracking-tight"
              />
              <ResizableTextArea
                name="description"
                placeholder="Post description"
                className="mt-5 w-full text-muted-foreground"
              />
            </div>

            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              {`${new Date().toLocaleDateString()} · ${
                sessionData?.user?.name || "Author Name Unknown"
              }`}
            </p>
          </div>
          <div className="absolute right-0 top-0 m-2 flex gap-2">
            {errorData && (
              <div className="rounded-sm bg-background/80 p-2 text-red-500">
                {Object.entries(errorData).map(([field, errors]) => (
                  <div className="flex items-baseline" key={field}>
                    {" "}
                    <p className="capitalize">{field}:</p>
                    <ul className="ml-2">
                      {errors &&
                        errors.map((error) => <li key={error}> {error}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Button type="submit" size="sm">
              Add
            </Button>
            <Button
              onClick={() => setAddPost(false)}
              variant="destructive"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

const ResizableTextArea = ({
  name,
  placeholder,
  className,
}: {
  name: keyof CreatePostInput;
  placeholder: string;
  className: string;
}) => {
  const refTitleVar = useRef<HTMLTextAreaElement | null>(null);

  const { register, watch } = useFormContext<CreatePostInput>();

  const { ref: refTitle, ...registerTitle } = register(name);

  const value = watch(name);

  useAutosizeTextArea(refTitleVar.current, value);

  return (
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
  );
};
