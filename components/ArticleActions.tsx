"use client";

import { useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArticleActions() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(126);

  const toggleLike = () => {
    setLikes((count) => (liked ? count - 1 : count + 1));
    setLiked((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        data-hover
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label="Like this article"
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-all duration-300",
          liked
            ? "border-accent/60 bg-accent/15 text-accent"
            : "border-line bg-elevated/80 text-muted hover:border-accent/40 hover:text-accent"
        )}
      >
        <Heart className={cn("size-4 transition-colors duration-300", liked && "fill-accent")} />
        {likes}
      </button>
      <button
        type="button"
        data-hover
        onClick={() => setSaved((prev) => !prev)}
        aria-pressed={saved}
        aria-label="Save this article"
        className={cn(
          "grid size-10 place-items-center rounded-full border transition-all duration-300",
          saved
            ? "border-accent/60 bg-accent/15 text-accent"
            : "border-line bg-elevated/80 text-muted hover:border-accent/40 hover:text-accent"
        )}
      >
        <Bookmark className={cn("size-4 transition-colors duration-300", saved && "fill-accent")} />
      </button>
    </div>
  );
}