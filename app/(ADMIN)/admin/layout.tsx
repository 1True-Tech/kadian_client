import { HasSlot } from "@/types/structures";

type Props = HasSlot;

export default function AdminOnly({ children }: Props) {
  return children;
}
