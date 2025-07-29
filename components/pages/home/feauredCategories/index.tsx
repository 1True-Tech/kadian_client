import LayeringBlob from '@/components/ui/layeringBlob'
import React from 'react'


export default function FeaturedCategories() {
  return (
     <div className="w-full h-fit flex flex-col items-center gap-3 relative mt-20 overflow-hidden">
      <h2
        className="text-center w-fit text-2xl sm:text-3xl font-bold border-b-4 border-accent"
      >
        SHOP BY CATEGORIES
      </h2>
      <ul
        className="w-full mx-auto sm:px-10 px-4 z-10 relative grid gap-2 grid-cols-2 min-[498px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] justify-items-center text-white"
      >
        <li
          className="w-full flex flex-col px-2 py-4 items-center justify-center gap-2 text-center"
        >
          <span
            className="w-full border-2 py-2 px-2.5 border-accent flex items-center justify-center"
          >
            <img
              src="/images/hero-image-1.jpg"
              alt="category"
              className="w-full h-32 object-cover object-center"
            />
          </span>
          <h4 className="text-lg font-semibold bg-light text-primary px-2">
            Dolor sit.
          </h4>
        </li>
         <li
          className="w-full flex flex-col px-2 py-4 items-center justify-center gap-2 text-center"
        >
          <span
            className="w-full border-2 py-2 px-2.5 border-accent flex items-center justify-center"
          >
            <img
              src="/images/hero-image-2.jpg"
              alt="category"
              className="w-full h-32 object-cover object-center"
            />
          </span>
          <h4 className="text-lg font-semibold bg-light text-primary px-2">
            Lorem, ipsum.
          </h4>
        </li>
        
      </ul>
      <LayeringBlob/>
    </div>
  )
}