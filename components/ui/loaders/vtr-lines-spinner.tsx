export default function VtrLinesSpinner() {
  const rects = Array.from({ length: 8 }).map((_, idx) => (
    <span key={idx}></span>
  ));
  return <div className="vtr-lines-spinner">{rects}</div>;
}
