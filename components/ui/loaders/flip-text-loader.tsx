export type FlipTextProps = {
  text: string;
};

export default function FlipTextLoader({ text }: FlipTextProps) {
  const textArray = text.split("");
  return (
    <div id="flip-text">
      {textArray.map((i, idx) => (
        <div key={idx} id={`l${idx + 1}`}>
          {i}
        </div>
      ))}
    </div>
  );
}
