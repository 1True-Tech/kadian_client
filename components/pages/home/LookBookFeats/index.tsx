import { processLookBook } from "@/lib/controllers/processHomepage/processLookBook";
import FtLookBookItem from "./ftLookBookItem";

export default async function LookBookFeats() {
  const lookBookData = await processLookBook();
  if(lookBookData.length <= 0) return null

  return (
    <div className="w-full h-fit px-container relative mt-10">
      <div className="w-full flex flex-col bg-background py-container items-center gap-medium rounded-t-2xl">
        <h2 className="text-center w-fit text-2xl sm:text-3xl font-bold underline decoration-accent underline-offset-4">
          Discover Your Next Favorite Outfit
        </h2>
        <ul className="w-full mx-auto z-10 relative flex justify-center flex-wrap gap-5 text-white">
          {lookBookData.map((item, idx) => (
            <FtLookBookItem data={item} key={idx} />
          ))}
        </ul>
      </div>
    </div>
  );
}
