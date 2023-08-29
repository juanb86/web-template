import Image from "next/image";
import { Button } from "./ui/button";
import AnimatedInView from "./ui/animated";

export default function Hero() {
  return (
    <div className="relative w-full" style={{ clipPath: "inset(0 0 0 0)" }}>
      <Image
        className="object-cover"
        alt="Office background"
        src="https://res.cloudinary.com/juanb86/image/upload/v1689638124/headway-5QgIuuBxKwM-unsplash_x9feal.jpg"
        placeholder="empty"
        quality={100}
        fill
        priority
      />
      <div className="absolute inset-0 bg-black/50"> </div>
      <div className="container bg-white pb-8 sm:pb-12 lg:pb-12">
        <div className="pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <AnimatedInView className="mt-20 flex flex-col items-baseline">
              <div className="my-6 sm:max-w-xl">
                <h1 className="text-primary-foreground">
                  Your Solution for Professional Online Presence
                </h1>
                <p className="text-primary-foreground">
                  Web-Template is a Next.js template designed to help you
                  quickly and easily create professional and effective online
                  presence websites for your clients. With a range of features
                  and customizable options, Web-Template provides everything you
                  need to establish your clients’ brand and identity online.
                </p>
              </div>
              <Button size="lg">Discover Me</Button>
            </AnimatedInView>
          </div>
        </div>
      </div>
    </div>
  );
}
