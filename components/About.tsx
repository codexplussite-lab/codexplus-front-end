"use client";

import React, { useEffect, useState } from "react";
import AboutStudioSection from "@/components/AboutStudioSection";
import { stats } from "@/data/content";

const fallbackHighlights = [
  "Collaborative, senior-led delivery",
  "Clean, maintainable engineering",
  "Uncompromising attention to detail",
];

export default function About() {
  const [highlights, setHighlights] = useState(fallbackHighlights);
  const [statsData, setStatsData] = useState(stats);
  const [kicker, setKicker] = useState("ABOUT THE STUDIO");
  const [title, setTitle] = useState("Where imagination meets engineering.");
  const [descriptions, setDescriptions] = useState<string[]>([
    "At our design studio, we're passionate about transforming raw ideas into reality. Every project starts with curiosity and ends with something people genuinely love to use.",
    "From first sketch to final deploy, we grow together with our clients — pairing clean, thoughtful engineering with visual direction that refuses to blend in.",
  ]);
  const [badge1Number, setBadge1Number] = useState("12+");
  const [badge1Label, setBadge1Label] = useState("YEARS OF CRAFT");
  const [badge2Number, setBadge2Number] = useState("40k+");
  const [badge2Label, setBadge2Label] = useState("creators shipped");

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then((data: any) => {
        if (!active) return;
        if (Array.isArray(data.highlights) && data.highlights.length > 0) {
          setHighlights(data.highlights);
        }
        if (Array.isArray(data.stats) && data.stats.length > 0) {
          setStatsData(data.stats);
        }
        if (data.aboutKicker) setKicker(data.aboutKicker);
        if (data.aboutTitle) setTitle(data.aboutTitle);
        if (Array.isArray(data.aboutDescription) && data.aboutDescription.length > 0) {
          setDescriptions(data.aboutDescription);
        }
        if (data.aboutBadge1Number) setBadge1Number(data.aboutBadge1Number);
        if (data.aboutBadge1Label) setBadge1Label(data.aboutBadge1Label);
        if (data.aboutBadge2Number) setBadge2Number(data.aboutBadge2Number);
        if (data.aboutBadge2Label) setBadge2Label(data.aboutBadge2Label);
      })
      .catch(() => {
        /* fall back to static content */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <AboutStudioSection
      kicker={kicker}
      title={title}
      descriptions={descriptions}
      highlights={highlights}
      stats={statsData}
      badge1Number={badge1Number}
      badge1Label={badge1Label}
      badge2Number={badge2Number}
      badge2Label={badge2Label}
    />
  );
}
