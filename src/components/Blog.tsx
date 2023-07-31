import { useRef, useState } from "react";
import type { Post, User } from "@prisma/client";
import Image from "next/image";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { type CreatePostInput } from "~/schemas/post.schema";
import useAutosizeTextArea from "~/utils/front";

export default function Blog() {
  const { data: sessionData } = useSession();

  const [addPost, setAddPost] = useState(false);

  const { data: posts } = api.post.getAll.useQuery();

  return (
    <div className="relative w-full bg-[radial-gradient(hsl(var(--background)_/_0.7),hsl(var(--background))_60%),url(/static/memphis_1.png);]">
      <div className="container py-24">
        <div className="flex flex-wrap">
          {posts?.map((card) => (
            <Card key={card.title} cardInfo={card} />
          ))}
          {addPost && <CreatePost setAddPost={setAddPost} />}
          {sessionData && !addPost && (
            <div className="m-3 flex basis-[31%] flex-col items-center justify-center overflow-hidden rounded-lg">
              <Button onClick={() => setAddPost(true)} size="lg">
                Add Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Card = ({
  cardInfo,
}: {
  cardInfo: Post & {
    author: User;
  };
}) => {
  return (
    <div className="relative m-3 flex basis-[31%] flex-col items-start overflow-hidden rounded-lg bg-white">
      <Image
        src={cardInfo.imageURL}
        alt={cardInfo.title}
        width={500}
        height={500}
      />
      <div className="flex h-full w-full flex-col justify-between px-8 pb-8 pt-4">
        <div>
          <h3 className="text-left font-semibold">{cardInfo.title}</h3>
          <p className="min-h-[140px] text-muted-foreground">
            {cardInfo.description}
          </p>
        </div>
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
          {`${cardInfo.createdAt.toLocaleDateString()} · ${
            cardInfo.author.name ||
            cardInfo.author.email ||
            "Author Name Unknown"
          }`}
        </p>
      </div>
    </div>
  );
};

const CreatePost = ({
  setAddPost,
}: {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          <Image
            src="https://res.cloudinary.com/dxozat4y8/image/upload/v1689896892/post-image_cuolxq.jpg"
            alt="image placeholder"
            width={500}
            height={500}
          />
          <div className="flex h-full w-full flex-col justify-between px-8 pb-8 pt-4">
            <div>
              {errors?.title?.message && (
                <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  {errors.title.message}
                </p>
              )}
              <ResizableTextArea
                name="title"
                placeholder="Post titleee"
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
};

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
