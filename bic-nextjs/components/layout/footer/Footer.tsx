"use client";

import { SocialMediaLinks } from "./SocialMediaLinks";
import { QuickLinksSection } from "./QuickLinksSection";
import { ContactInfo } from "./ContactInfo";
import { NewsletterSignup } from "./NewsletterSignup";
import { UniversityBranding } from "./UniversityBranding";
import { FooterSchema } from "./FooterSchema";

export function Footer() {
  return (
    <>
      <FooterSchema />
      <footer className="bg-background border-border border-t">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Social Media Links */}
            <SocialMediaLinks />

            {/* Quick Links */}
            <QuickLinksSection />

            {/* Contact Information */}
            <ContactInfo />

            {/* Newsletter Signup */}
            <NewsletterSignup />
          </div>

          {/* University Branding and Legal */}
          <UniversityBranding />
        </div>
      </footer>
    </>
  );
}
