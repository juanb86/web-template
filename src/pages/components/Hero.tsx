import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="w-full" style={{ clipPath: "inset(0 0 0 0)" }}>
      <Image
        className="object-cover"
        alt="Office background"
        src="https://res.cloudinary.com/dxozat4y8/image/upload/v1689638124/headway-5QgIuuBxKwM-unsplash_x9feal.jpg"
        placeholder="empty"
        quality={100}
        fill
      />
      <div className="absolute inset-0 bg-black/30"> </div>
      <div className="container bg-white pb-8 sm:pb-12 lg:pb-12">
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mt-20 flex flex-col items-baseline">
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
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
