
import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex justify-center mt-2 md:mt-5 ">
            <div className="flex flex-col gap-4">
                <div className="text-center text-white text-3xl font-semibold font-mono">Welcome to</div>
                <div className="font-mono">
                    <p className="text-center text-4xl md:text-6xl text-red-400 font-semibold">THE GAUDA TIMES</p>
                    <div className="text-gray-400 text-xl md:text-xl font-mono mt-4 text-center tracking-tighter">
                        <p>because everything has a story</p>
                        <p>and we are here to capture them into words..</p>
                        </div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <Image
                        src={"/hero.png"}
                        alt="Hero"
                        width={1000}
                        height={1000}
                        className="w-[90vw] lg:max-w-[50vw] h-auto md:h-[60vh] rounded-3xl border border-gray-600"
                    />
                </div>
            </div>
        </div>
    );
}
