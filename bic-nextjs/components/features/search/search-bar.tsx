"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

export function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("utility.search");

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // TODO: Implement actual search functionality
      console.log("Search query:", query);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCollapse();
    }
  };

  return (
    <div className="relative flex items-center">
      {!isExpanded ? (
        <button
          onClick={handleExpand}
          className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label={t("button")}
        >
          <Search className="h-4 w-4" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-64 rounded-md border pr-9 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t("placeholder")}
            />
            <button
              type="button"
              onClick={handleCollapse}
              className="hover:bg-accent hover:text-accent-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1"
              aria-label="Close search"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </form>
      )}

      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleCollapse}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
