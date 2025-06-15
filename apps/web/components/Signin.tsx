"use client";
import { signIn } from "next-auth/react";;
import { useRouter } from "next/navigation";
const Signin = () => {
  const router = useRouter();
  return (
     <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col text-center">
          <h2 className="font-semibold text-3xl md:text-4xl tracking-tighter text-[#a79bcc]">
            Welcome to{" "}
            <div className="font-bold bg-[#7D68BF] bg-clip-text text-transparent tracking-wider mt-2">
              THE GAUDA TIMES
            </div>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="w-full flex gap-2 p-4 font-medium md:text-lg rounded-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-gradient-to-b from-purple-400 to-blue-900 text-white justify-center items-center"
            onClick={async () => {
              await signIn("google");
              router.push("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              fill="currentColor"
              className="size-6 md:size-8 text-white"
            >
              <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
            </svg>
            Continue with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
