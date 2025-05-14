import Image, { type ImageProps } from "next/image";
import Hero from "../components/Hero";
import { Appbar } from "../components/Navbar";
import RecentBlogs from "../components/RecentBlogs";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Appbar />
      <Hero />
      <div className="bg-[#282536]">
      {/* <SearchBar /> */}
      <RecentBlogs />
      </div>
      <Footer />
    </div>
  );
}
