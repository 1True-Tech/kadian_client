import BackButton from "@/components/feautures/backButton";

export default function page() {
  return (
    <>
      <BackButton defaultHref="/account/order-history" text={"All History"} />
      <h2 className="absolute font-bold text-base sm:text-lg md:text-xl left-1/2 -translate-1/2 top-1/2">
        Order detail
      </h2>
    </>
  );
}
