import Hero from "../components/Hero";
import { Appbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { HomeBlogs } from "../components/blogs/BlogWithTabs";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Appbar />
      <Hero />
      <div className="bg-[#2c2b3b] mt-10 h-auto">
        <div>
          {/* <SearchBar /> */}
        <HomeBlogs />
        </div>
      </div>
      <Footer />
    </div>
  );
}
