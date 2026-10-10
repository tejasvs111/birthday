import FloatingItems from "./FloatingItems";
import Sparkles from "./Sparkles";

/** Fixed background layer shared by every page: sparkles and drifting hearts. */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Sparkles />
      <FloatingItems count={16} />
    </div>
  );
}
