import Hero from "../components/Hero";
import { Appbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { HomeBlogs } from "../components/blogs/BlogWithTabs";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Hero />
      <div className="mt-10 h-auto">
        <div>
          <HomeBlogs />
          {/* <div className="flex justify-center items-center flex-col">
            <Image
              src={"/hero.jpg"}
              alt="Hero"
              width={1000}
              height={1000}
              className="w-[90vw] lg:max-w-[50vw] h-auto md:h-[60vh] rounded-3xl border border-gray-600"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
