import type { Metadata } from "next";
import CelebrationView from "@/components/CelebrationView";
import { GIRL_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: `A Thousand Times Yes, ${GIRL_NAME} ❤️`,
};

export default function CelebrationPage() {
  return <CelebrationView />;
}
