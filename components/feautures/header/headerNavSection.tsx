import ActionsClient from "./actionsClient";

const categories = ["women", "men", "kids"];

export default function HeaderNavSection() {
  return (
    <nav className="w-full py-4 relative flex items-center justify-between">
      {/* left */}
      <ul className="w-fit flex items-center gap-3 justify-between">
        {categories.map((i, idx) => (
          <li key={idx} className="capitalize active:underline hover:underline">
            {i}
          </li>
        ))}
      </ul>
      {/* center */}

      <div className="w-fit pointer-events-none opacity-0 min-[950px]:opacity-100 duration-300 min-[950px]:pointer-events-auto flex gap-2 flex-col font-cinzel text-3xl font-bold absolute top-1/2 left-1/2 -translate-1/2">
        <b>KADIAN</b>
      </div>
      {/* right */}
      <ActionsClient/>
    </nav>
  );
}
