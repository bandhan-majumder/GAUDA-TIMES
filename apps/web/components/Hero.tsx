import SearchBar from "./SearchBar";

export default function Hero() {
    return (
        <div className="h-[calc(100vh-17rem)] flex justify-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="text-center text-gray-200 text-4xl font-semibold font-mono">Welcome to</div>
                <div className="font-mono">
                    <p className="text-center text-4xl md:text-7xl text-[#4a4880] font-semibold tracking-tighter">THE GAUDA TIMES</p>
                    <div className="text-gray-400 text-xl md:text-xl font-mono mt-4 text-center tracking-tighter">
                        <p>because everything has a story and</p>
                        <p>we are here to capture them into words..</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
