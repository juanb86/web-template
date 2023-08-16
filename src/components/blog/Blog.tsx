import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import CreatePost from "./CreatePost";
import { SinglePost } from "./Post";

export default function Blog() {
  const { data: sessionData } = useSession();

  const [addPost, setAddPost] = useState(false);

  const { data: posts } = api.post.getAll.useQuery();

  return (
    <div className="relative w-full bg-[radial-gradient(hsl(var(--background)_/_0.7),hsl(var(--background))_60%),url(/static/memphis_1.png);]">
      <div className="container py-24">
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <SinglePost key={post.title} postInfo={post} />
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
