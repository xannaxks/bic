"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function NewsletterSignup() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful subscription
      setStatus("success");
      setMessage("Successfully subscribed to newsletter!");
      setEmail("");

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch {
      setStatus("error");
      setMessage("Subscription failed. Please try again.");

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="footer-section">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        {t("newsletter.title")}
      </h3>

      <p className="text-muted-foreground mb-4 text-sm">
        {t("newsletter.description")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            required
            disabled={status === "loading"}
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading" || !email}
          className="w-full"
          size="sm"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            t("newsletter.subscribe")
          )}
        </Button>

        {message && (
          <p
            className={`text-sm ${
              status === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
