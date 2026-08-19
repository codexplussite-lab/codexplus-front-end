export const LEAD_CONTEXT_EVENT = "codexplus:lead-context";

export type LeadContext = {
  title: string;
  category?: string;
  year?: string;
};

export function leadContextMessage(ctx: LeadContext): string {
  const parts = [ctx.category, ctx.year].filter(Boolean).join(" · ");
  return `Interested in something similar to "${ctx.title}"${
    parts ? ` (${parts})` : ""
  }.`;
}
