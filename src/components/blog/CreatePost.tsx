import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { createPostSchema, type CreatePostInput } from "~/schemas/post.schema";
import { fetchCloudinary } from "~/utils/front";
import SetImage from "./SetImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResizableTextArea } from "./ResizableTextArea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ShowErrorFields } from "../ui/errors";
import AnimatedInView from "../ui/animated";

export default function CreatePost({
  setAddPost,
}: {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const imageURLstate = useState<string | null>(null);

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    setValue,
    setError,
    getFieldState,
    trigger,
    formState,
  } = methods;

  const { isSubmitting } = formState;

  const { data: sessionData } = useSession();

  const ctx = api.useContext();

  const {
    mutate,
    error: createError,
    isLoading: isLoadingCreate,
  } = api.post.create.useMutation({
    onSuccess: () => {
      setAddPost(false);
      void ctx.post.getAll.invalidate();
    },
  });

  const { data: cloudinary } = api.post.cloudinary.useQuery();

  async function uploadAndSubmit(event: FormEvent<HTMLFormElement>) {
    await trigger("title");
    await trigger("description");

    const { error: titleError } = getFieldState("title");
    const { error: descriptionError } = getFieldState("description");

    if (titleError || descriptionError) {
      return;
    }

    if (!cloudinary) {
      setError("imageURL", {
        type: "custom",
        message: "Cludinary data missing",
      });
      return;
    }
    if (!imageURLstate[0]) {
      setError("imageURL", {
        type: "custom",
        message: "Image data missing",
      });
      return;
    }

    setIsUploadingImg(true);
    const cloudinaryImg = await fetchCloudinary({
      imageData: imageURLstate[0],
      cloud: cloudinary.cloud,
      preset: cloudinary.preset,
    });

    if (!cloudinaryImg.data) {
      setError("imageURL", {
        type: "custom",
        message: cloudinaryImg.error?.message || "Image upload failed",
      });
      setIsUploadingImg(false);
      return;
    }

    setValue("imageURL", cloudinaryImg.data.secure_url);

    void handleSubmit(onSubmit)(event);
    setIsUploadingImg(false);
  }

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  const createErrorFields = createError?.data?.zodError?.fieldErrors;

  return (
    <AnimatedInView animation="none" className="relative m-3 basis-[31%]">
      <ShowErrorFields errorFields={createErrorFields} />
      <FormProvider {...methods}>
        <form
          noValidate
          className="flex h-full flex-col items-start overflow-hidden rounded-lg bg-white"
          onSubmit={(event) => {
            event.preventDefault();
            void uploadAndSubmit(event);
          }}
        >
          <SetImage imageURLstate={imageURLstate} />
          <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-4">
            <div>
              <ResizableTextArea
                name="title"
                placeholder="Post title"
                className="mb-5 w-full text-2xl font-semibold tracking-tight"
              />
              <ResizableTextArea
                name="description"
                placeholder="Post description"
                className="w-full text-muted-foreground"
              />
            </div>

            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              {`${new Date().toLocaleDateString()} · ${
                sessionData?.user?.name || "Author Name Unknown"
              }`}
            </p>
          </div>
          <div className="absolute right-0 top-0 m-2 flex gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={isUploadingImg || isSubmitting || isLoadingCreate}
            >
              {isUploadingImg || isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Add"
              )}
            </Button>
            <Button
              onClick={() => setAddPost(false)}
              disabled={isUploadingImg || isSubmitting || isLoadingCreate}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </AnimatedInView>
  );
}
