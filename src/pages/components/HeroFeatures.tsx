import {
  ChatBubbleIcon,
  TargetIcon,
  GlobeIcon,
  CheckboxIcon,
} from "@radix-ui/react-icons";

const cardsContent = [
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
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
          Icon={card.icon}
        />
      ))}
    </div>
  );
}

const Card = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className="m-3 flex flex-col items-center rounded bg-white p-8">
      <Icon className="mb-4 h-10 w-10 text-primary" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  );
};
