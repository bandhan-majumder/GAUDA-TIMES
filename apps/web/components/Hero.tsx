import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex justify-center mt-2 md:mt-5 ">
            <div className="flex flex-col gap-12">
                <div className="font-mono">
                    <p className="text-center text-4xl md:text-6xl text-[#7D68BF] font-semibold">THE GAUDA TIMES</p>
                    <p className="text-gray-400 text-xl md:text-4xl font-mono mt-10 text-center">
                        because everything has a story.</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <Image
                        src={"/hero.png"}
                        alt="Hero"
                        width={1000}
                        height={1000}
                        className="w-[90vw] lg:max-w-[50vw] h-auto md:h-[60vh] rounded-3xl border border-1 border-white"
                    />
                </div>
            </div>
        </div>
    );
}
