import Image, { type ImageProps } from "next/image";
import Hero from "../components/Hero";
import { Appbar } from "../components/Navbar";
import RecentBlogs from "../components/RecentBlogs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#1D222E] to-[#22252c]">
      <Appbar />
      <Hero />
      <RecentBlogs />
      <Footer />
    </div>
  );
}
