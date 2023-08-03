import { useState } from "react";
import type { Post, User } from "@prisma/client";
import Image from "next/image";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import CreatePost from "./CreatePost";

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
      <div className="aspect-[9/6] w-full overflow-hidden">
        <Image
          src={cardInfo.imageURL}
          alt={cardInfo.title}
          width={1500}
          height={500}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-4">
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
