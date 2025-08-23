import BackButton from "@/components/feautures/backButton";
import BgMask from "@/components/layout/bg-mask";
import { HasSlot } from "@/types";

export default function layout({ children }: HasSlot) {
  return (
    <div className="w-full min-h-screen grid md:grid-cols-2 bg-gradient-to-b from-accent/50 to-secondary isolate relative">
      <BgMask position="bottom-right" image="/images/content/image (5).jpg" />
      <main className="w-full min-h-full flex flex-col items-center justify-center">
        <div className="w-full px-container">
          <div className="max-w-md mx-auto">
            <BackButton text={"Go to Home"} defaultHref="/" className="bg-accent !px-small md:px-0 md:bg-transparent" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
