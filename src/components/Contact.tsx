import Image from "next/image";
import { EnvelopeClosedIcon, BackpackIcon } from "@radix-ui/react-icons";
import PhoneIcon from "~/components/ui/icons/PhoneIcon";
import { ContactForm } from "./ContactForm";
import AnimatedInView from "./ui/animated";

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const cardsContent: CardProps[] = [
  {
    title: "Head Office",
    description: "Publica 1234, Nogoyá - Argentina",
    icon: BackpackIcon,
  },
  {
    title: "Email us",
    description: "support@webtemplate.com",
    icon: EnvelopeClosedIcon,
  },
  {
    title: "Call us",
    description: "03435-423456",
    icon: PhoneIcon,
  },
];

export default function Contact() {
  return (
    <>
      <div className="relative w-full" style={{ clipPath: "inset(0 0 0 0)" }}>
        <Image
          className="object-cover"
          alt="Office background2"
          src="https://res.cloudinary.com/juanb86/image/upload/v1692228198/yibei-geng--UdYbiywGeg-unsplash_zwpqp2.jpg"
          placeholder="empty"
          quality={100}
          fill
        />
        <div className="absolute inset-0 bg-black/50"> </div>
        <div className="container bg-white pb-8 sm:pb-12 lg:pb-12">
          <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-12">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8">
              <div className="mt-20 flex flex-col items-baseline">
                <AnimatedInView animation="top" className="my-6">
                  <h1 className="mb-4 text-primary-foreground">
                    Easy Post Creation and Management
                  </h1>
                  <p className="text-primary-foreground">
                    With Web-Template, creating and managing blog posts has
                    never been easier. Our backend includes functionality for
                    post creation, allowing you to quickly add new content to
                    your clients’ websites. Plus, with our integration with
                    Cloudinary, you can easily upload and manage images within
                    your posts. Keep your clients’ websites up-to-date and
                    engaging with Web-Template.
                  </p>
                </AnimatedInView>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container z-10 -mt-24 flex pb-24">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-[3fr_4fr] lg:px-8">
          <AnimatedInView
            animation="left"
            className="m-3 overflow-hidden rounded bg-white"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26950.49668392553!2d-59.822807042124616!3d-32.39739863877068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b13510c9697b6f%3A0x56df0d13059518c3!2zTm9nb3nDoSwgRW50cmUgUsOtb3M!5e0!3m2!1ses!2sar!4v1692919317754!5m2!1ses!2sar"
              allowFullScreen={true}
              aria-hidden="false"
              tabIndex={0}
              className="h-56 w-full border-0"
            />
            <div className="flex flex-col gap-6 p-8">
              {cardsContent.map((card) => (
                <div key={card.title} className="flex">
                  <card.icon className="mb-4 mr-4 h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">{card.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedInView>
          <AnimatedInView className="m-3 flex flex-col items-start rounded bg-white p-8">
            <h2 className="mb-4">Send us a message</h2>
            <ContactForm />
          </AnimatedInView>
        </div>
      </div>
    </>
  );
}
