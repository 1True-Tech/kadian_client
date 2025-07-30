import { HasSlot } from "@/types";

type Props = HasSlot;

export default function AdminOnly({ children }: Props) {
  return children;
}
