"use client";
import React from 'react'
import Image from 'next/image'
import { Facebook } from 'lucide-react'
import { MdEmail } from 'react-icons/md'
import toast from 'react-hot-toast'

function Page() {
  const onSupportClick = () => {
    toast.success("Url copied to clipboard!");
  };

  const goToHomePage = () => {
    window.location.href = '/';
  };

  return (
    <div className='min-h-screen flex flex-col items-center gap-4 p-4 bg-[#16161D]'>
      <div className='text-3xl md:text-4xl font-bold text-[#665499] underline decoration-[#665499] decoration-4'>
        About Us
      </div>

      <div className='flex flex-col md:flex-row justify-center mt-10 gap-8 p-4 rounded-2xl w-full max-w-6xl'>
        <div className='w-full md:w-1/2 flex justify-center items-center'>
          <div className='flex flex-col items-center gap-4'>
            <Image src={"/author.jpeg"} width={300} height={400} alt='author' className='rounded-2xl object-cover' />
            <div className='text-white text-xl font-semibold tracking-tighter'>লেখক: আকাশ মিশ্র</div>
            <div className='flex flex-row items-center gap-4'>
              <Facebook color='white' size={24} />
              <MdEmail color='white' size={24} />
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/2 text-base md:text-lg text-white flex flex-col gap-4'>
          <div>
            আমাদের মূল লক্ষ্য বাংলার ইতিহাসকে নতুন করে পুনরুদ্ধার করা। এই বাংলার ইতিহাস অনেক প্রাচীন এবং গৌরবময়। সেই গৌড়েশ্বর শশাঙ্ক থেকে শুরু করে পাল সম্রাট ধর্মপাল, সেন সম্রাট বল্লালসেন। পরবর্তীতে ইসলামিক শাসকগণ তারপর নবাবি আমল (মুর্শিদকুলি খান, আলিবর্দী খান, সিরাজউদ্দৌলা)। সর্বশেষে ব্রিটিশ শাসন।
          </div>
          <div>
            এই সমগ্ৰ সময়টাতে অর্থাৎ সপ্তম শতকে থেকে বিংশ শতাব্দী পর্যন্ত বাংলার ইতিহাসের পাতায় অনেক পালাবদল ঘটেছে। অনেক ইতিহাস মাটির নিচে চাপা পড়ে গেছে। ইতিহাস বোবা ইতিহাসকে মাটি খুঁড়ে বের করে আনতে হয়, নইলে সেই ইতিহাস অচিরেই সাফ হয়ে ফাঁকা জমির অনেক নীচে চলে যাবে। সেই মাটির নীচে চাপা পড়ে যাওয়া ইতিহাসের পুনরুদ্ধার করাই আমাদের কর্তব্য।
          </div>
          <div>
            আমরা THE GAUDA TIMES বাংলার এই রহস্যময় ইতিহাসের অনুসন্ধান চালিয়ে যাবো আর নতুন কিছু জানতে পারলে অবশ্যই আপনাদের জানাবো।
          </div>
        </div>
      </div>

      <div className='flex md:flex-row flex-col items-center md:gap-2'>
        <div className='text-lg text-white mt-10'>
        <button
          onClick={onSupportClick}
          className='bg-[#665499] hover:bg-[#464472] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
        >
          Share our page
        </button>
      </div>
      <div className='text-lg text-white mt-10'>
        <button
          onClick={goToHomePage}
          className='bg-[#665499] hover:bg-[#464472] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
        >
          Go to Home Page
        </button>
      </div>
      </div>
    </div>
  )
}

export default Page
