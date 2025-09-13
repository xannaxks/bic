"use client";

import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const socialPlatforms = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/tongmyonguniversity",
    color: "hover:text-[#1877F2]",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/tongmyong_edu",
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/tongmyong_university",
    color: "hover:text-[#E4405F]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@TongmyongUniversity",
    color: "hover:text-[#FF0000]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/school/tongmyong-university",
    color: "hover:text-[#0A66C2]",
  },
];

export function SocialMediaLinks() {
  return (
    <div className="footer-section">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        Connect With Us
      </h3>

      <div className="mb-4 flex gap-3">
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-muted hover:bg-muted-foreground/10 rounded-full p-2 transition-all duration-200 ${platform.color}`}
              aria-label={`Follow us on ${platform.name}`}
            >
              <IconComponent className="h-5 w-5" />
            </a>
          );
        })}
      </div>

      <p className="text-muted-foreground text-sm">
        Stay updated with university news and events
      </p>
    </div>
  );
}
