export default function calculatePercentage({
  value = 0,
  fromOriginal = 0,
  valueAs = "normal",
}: {
  fromOriginal: number;
  value: number;
  valueAs?: "percentage" | "normal";
}) {
  if (valueAs === "percentage") {
    return (value / 100) * fromOriginal;
  }

  return (value / fromOriginal) * 100;
}
