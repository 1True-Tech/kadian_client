import FtCategoryItem from "./ftCategoryItem";

export default function FeaturedCategories() {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-3 relative mt-20 overflow-hidden">
      <h2 className="text-center w-fit text-2xl sm:text-3xl font-bold border-b-4 border-accent">
        SHOP BY CATEGORIES
      </h2>
      <ul className="w-full mx-auto sm:px-10 px-4 z-10 relative flex justify-center flex-wrap gap-5 text-white">
        <FtCategoryItem text="Dolor sit." image="/images/hero-image-1.jpg" />
        <FtCategoryItem text="Lorem, ipsum." image="/images/hero-image-2.jpg" />
        <FtCategoryItem text="Dolor sit." image="/images/hero-image-1.jpg" />
        <FtCategoryItem text="Lorem, ipsum." image="/images/hero-image-2.jpg" />
        <FtCategoryItem text='Dolor sit.' image='/images/hero-image-1.jpg'/>
        <FtCategoryItem text='Lorem, ipsum.' image='/images/hero-image-2.jpg'/>
      </ul>
    </div>
  );
}
