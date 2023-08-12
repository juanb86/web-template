import { useState } from "react";
import type { Post, User } from "@prisma/client";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import CreatePost from "./CreatePost";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: sessionData } = useSession();

  const { id, title, description, imageURL, author, createdAt } = cardInfo;

  const ctx = api.useContext();

  const {
    mutate: deletePost,
    isLoading,
    error: deleteError,
  } = api.post.delete.useMutation({
    onSuccess: () => {
      void ctx.post.getAll.invalidate();
    },
  });

  const deleteErrorFields = deleteError?.data?.zodError?.fieldErrors;
  const deleteErrorMsg = !deleteErrorFields && deleteError?.message;

  return (
    <div className="relative m-3 basis-[31%]">
      {deleteErrorFields && (
        <div className="absolute bottom-full left-0 z-50 mb-1 rounded-sm bg-red-500 px-2 text-white opacity-90 after:absolute after:left-1/2 after:top-full after:-ml-1 after:border-4 after:border-solid after:border-transparent after:border-t-red-500">
          {Object.entries(deleteErrorFields).map(([field, errors]) => (
            <div className="flex items-baseline" key={field}>
              {" "}
              <p className="capitalize">{field}:</p>
              <ul className="ml-2">
                {errors && errors.map((error) => <li key={error}> {error}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
      {deleteErrorMsg && (
        <div className="absolute bottom-full left-0 z-50 mb-1 rounded-sm bg-red-500 px-2 text-white opacity-90 after:absolute after:left-1/2 after:top-full after:-ml-1 after:border-4 after:border-solid after:border-transparent after:border-t-red-500">
          <p>{deleteErrorMsg}</p>
        </div>
      )}
      <div className="flex flex-col items-start overflow-hidden rounded-lg bg-white">
        <div
          className="aspect-[9/6] w-full overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
        <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-4">
          <div>
            <h3 className="text-left font-semibold">{title}</h3>
            <p className="min-h-[140px] text-muted-foreground">{description}</p>
          </div>
          <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
            {`${createdAt.toLocaleDateString()} · ${
              author.name || author.email || "Author Name Unknown"
            }`}
          </p>
        </div>
        {sessionData && (
          <div className="absolute right-0 top-0 m-2 flex gap-2">
            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogTrigger asChild>
                <Button disabled={isLoading} variant="destructive" size="sm">
                  {isLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    You want to delete this post?
                  </DialogDescription>
                  <DialogDescription asChild>
                    <h3>{title}</h3>
                  </DialogDescription>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setConfirmDelete(false);
                      deletePost({ id });
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};
