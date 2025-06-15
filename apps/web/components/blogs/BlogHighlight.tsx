import React, { useState, useEffect } from 'react'
import { checkImage } from '../../lib/checkImageURL';
import Image from 'next/image';
import Link from 'next/link';

function BlogHighlight({ id, title, description, image, createdAt }: {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
}) {
  const [imageURL, setImageURL] = useState<string>("https://i.ibb.co/Df8XfYjK/loading-image.webp");

  useEffect(() => {
    const validateImage = async () => {
      if (image) { // if image is not an empty string
        try {
          const isValid = await checkImage(image);
          if (isValid) {
            setImageURL(image);
          }
        } catch (error) {
          console.error("Error validating image:", error);
        }
        return;
      }
      setImageURL("https://i.ibb.co/r2ncvW98/assets-task-01jx80btkjfc184dmmsmb58t5w-1749394323-img-1.webp"); 
    };
    validateImage();
  }, [image]);

  return (
    <div className="w-full mx-auto px-2 sm:px-4 mb-4 sm:mb-6">
      <Link href={`/blog/${id}`} target="_blank" className="block">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 shadow-lg shadow-neutral-600/10 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#2c2930] text-white hover:bg-[#1c1c1c] transition-colors">
          <div className="flex-shrink-0 flex justify-center xs:justify-start">
            <Image
              src={imageURL}
              alt={`${title} thumbnail`}
              width={100}
              height={100}
              crossOrigin='anonymous'
              className="rounded-lg sm:rounded-xl md:rounded-2xl object-cover w-20 h-20 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
          </div>

          <div className="flex-grow flex flex-col justify-center mt-2 xs:mt-0">
            <h2 className="text-lg xs:text-xl md:text-2xl font-bold line-clamp-2">{title}</h2>
            <p className="text-gray-400 mt-1 sm:mt-2 line-clamp-2 text-xs sm:text-sm md:text-base">{description}</p>
          </div>

          {createdAt && (
            <div className="flex xs:hidden mt-2 text-end">
              <p className="text-gray-400 text-xs text-end w-full">
                Published on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {createdAt && (
            <div className="hidden xs:flex flex-shrink-0 items-center justify-end mt-2 xs:mt-0">
              <p className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                Published on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default BlogHighlight