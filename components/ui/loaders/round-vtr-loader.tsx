export default function RoundVtrLoader() {
  const bars = Array.from({ length: 12 }).map((_, idx) => (
    <div key={idx} className={`bar${idx + 1}`}></div>
  ));
  return <div className="round-vtr-loader">{bars}</div>;
}
