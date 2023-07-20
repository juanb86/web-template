import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  footer: string;
  image: string;
}

const cardsContent: CardProps[] = [
  {
    title: "Breaking Down How Might We (HMW) Questions",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
    footer: "September 21, 2022 · No Comments",
    image:
      "https://res.cloudinary.com/dxozat4y8/image/upload/v1689896892/post-image_cuolxq.jpg",
  },
  {
    title: "Breaking Down How Might We (HMW) Questions",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
    footer: "September 21, 2022 · No Comments",
    image:
      "https://res.cloudinary.com/dxozat4y8/image/upload/v1689896892/post-image_cuolxq.jpg",
  },
  {
    title: "Breaking Down How Might We (HMW) Questions",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
    footer: "September 21, 2022 · No Comments",
    image:
      "https://res.cloudinary.com/dxozat4y8/image/upload/v1689896892/post-image_cuolxq.jpg",
  },
];

export default function Blog() {
  return (
    <div className="relative w-full bg-[radial-gradient(hsl(var(--background)_/_0.7),hsl(var(--background))_60%),url(/static/memphis_1.png);]">
      <div className="container flex py-24">
        {cardsContent.map((card) => (
          <Card key={card.title} cardInfo={card} />
        ))}
      </div>
    </div>
  );
}

const Card = ({ cardInfo }: { cardInfo: CardProps }) => {
  return (
    <div className="m-3 flex flex-col items-center overflow-hidden rounded-lg bg-white">
      <Image
        src={cardInfo.image}
        alt={cardInfo.title}
        width={500}
        height={500}
      />
      <div className="px-8 pb-8 pt-4">
        <h3 className="text-left font-semibold">{cardInfo.title}</h3>
        <p className="text-muted-foreground">{cardInfo.description}</p>
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
          {cardInfo.footer}
        </p>
      </div>
    </div>
  );
};
