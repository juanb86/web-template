import Head from "next/head";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import HeroFeatures from "~/components/HeroFeatures";
import Blog from "~/components/blog/Blog";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>web template.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main className="flex flex-col items-center justify-center">
        <Navbar />
        <Hero />
        <HeroFeatures />
        <Blog />
        <Footer />
      </main>
    </>
  );
}
