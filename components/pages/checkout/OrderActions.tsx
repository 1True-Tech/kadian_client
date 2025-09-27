import { Button } from "@/components/ui/button";

type Props = {
  onNext: () => void;
  onBack: () => void;
  disableNext?: boolean;
};

export const OrderActions = ({ onNext, onBack, disableNext }: Props) => (
  <div className="flex justify-between">
    <Button variant="outline" onClick={onBack}>Back</Button>
    <Button className="btn-hero" onClick={onNext} disabled={disableNext}>Next</Button>
  </div>
);
