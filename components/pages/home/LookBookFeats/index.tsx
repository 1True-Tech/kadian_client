import { LookBookItem } from "@/types/home";
import FtLookBookItem from "./ftLookBookItem";

export default function LookBookFeats({items}:{items:LookBookItem[]}) {
  return (
    <div className="w-full h-fit flex flex-col px-container items-center gap-medium relative mt-20 overflow-hidden">
      <h2 className="text-center w-fit text-2xl sm:text-3xl font-bold underline decoration-accent underline-offset-4">
         Discover Your Next Favorite Outfit
      </h2>
      <ul className="w-full mx-auto z-10 relative flex justify-center flex-wrap gap-5 text-white">
        
        {
          items.map((item, idx)=> <FtLookBookItem data={item} key={idx} />)
        }
      </ul>
    </div>
  );
}
