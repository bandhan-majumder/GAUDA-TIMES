
import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex justify-center mt-2 md:mt-5">
            <div className="flex flex-col gap-4">
                <div className="text-center text-white text-3xl font-semibold font-mono">Welcome to</div>
                <div className="font-mono">
                    <p className="text-center text-4xl md:text-6xl text-[#4a4880] font-semibold">THE GAUDA TIMES</p>
                    <div className="text-gray-400 text-xl md:text-xl font-mono mt-4 text-center tracking-tighter">
                        <p>because everything has a story</p>
                        <p>and we are here to capture them into words..</p>
                        </div>
                </div>
            </div>
        </div>
    );
}
