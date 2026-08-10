import { cn } from "@/lib/utils";

type AnimatedBackgroundProps = {
  className?: string;
};

export default function AnimatedBackground({
  className,
}: AnimatedBackgroundProps) {
  return (
    <div aria-hidden className={cn("animated-bg", className)}>
      <div className="blob blob-purple blob-1" />
      <div className="blob blob-pink blob-2" />
      <div className="blob blob-blue blob-3" />
      <div className="blob blob-teal blob-4" />
    </div>
  );
}
