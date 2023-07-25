import type { Post, User } from "@prisma/client";
import Image from "next/image";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function Blog() {
  const { data: sessionData } = useSession();

  const { data: posts } = api.post.getAll.useQuery();

  return (
    <div className="relative w-full bg-[radial-gradient(hsl(var(--background)_/_0.7),hsl(var(--background))_60%),url(/static/memphis_1.png);]">
      <div className="container py-24">
        <div className="flex">
          {posts?.map((card) => (
            <Card key={card.title} cardInfo={card} />
          ))}
        </div>
        {sessionData && <Button size="lg">Add Post</Button>}
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
    <div className="m-3 flex basis-1/3 flex-col items-center overflow-hidden rounded-lg bg-white">
      <Image
        src={cardInfo.imageURL}
        alt={cardInfo.title}
        width={500}
        height={500}
      />
      <div className="px-8 pb-8 pt-4">
        <h3 className="text-left font-semibold">{cardInfo.title}</h3>
        <p className="text-muted-foreground">{cardInfo.description}</p>
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
