import {
  ChatBubbleIcon,
  TargetIcon,
  GlobeIcon,
  CheckboxIcon,
} from "@radix-ui/react-icons";
import AnimatedInView from "./ui/animated";

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const cardsContent: CardProps[] = [
  {
    title: "Strategy",
    description:
      "Pulvinar enim nisl turpis dignissim lobortis viverra facilisis nisi bibendum.",
    icon: TargetIcon,
  },
  {
    title: "Consultancy",
    description:
      "Pulvinar enim nisl turpis dignissim lobortis viverra facilisis nisi bibendum.",
    icon: ChatBubbleIcon,
  },
  {
    title: "Positioning",
    description:
      "Pulvinar enim nisl turpis dignissim lobortis viverra facilisis nisi bibendum.",
    icon: GlobeIcon,
  },
  {
    title: "Evaluation",
    description:
      "Pulvinar enim nisl turpis dignissim lobortis viverra facilisis nisi bibendum.",
    icon: CheckboxIcon,
  },
];

export default function HeroFeatures() {
  return (
    <div className="container z-10 -mt-32 flex">
      {cardsContent.map((card) => (
        <Card key={card.title} cardInfo={card} />
      ))}
    </div>
  );
}

const Card = ({ cardInfo }: { cardInfo: CardProps }) => {
  return (
    <AnimatedInView
      animation="bottom"
      rootMargin={150}
      className="m-3 flex flex-col items-center rounded bg-white p-8"
    >
      <cardInfo.icon className="mb-4 h-10 w-10 text-primary" />
      <h3 className="font-semibold">{cardInfo.title}</h3>
      <p className="text-center text-muted-foreground">
        {cardInfo.description}
      </p>
    </AnimatedInView>
  );
};
