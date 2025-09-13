"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("footer");

  return (
    <div
      className="footer-section"
      itemScope
      itemType="http://schema.org/University"
    >
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        {t("contact.title")}
      </h3>

      <div className="space-y-3 text-sm">
        {/* Address */}
        <div
          itemProp="address"
          itemScope
          itemType="http://schema.org/PostalAddress"
          className="flex items-start gap-3"
        >
          <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="text-muted-foreground">
            <div itemProp="streetAddress">428 Sinseon-ro</div>
            <div>
              <span itemProp="addressLocality">Nam-gu</span>,{" "}
              <span itemProp="addressRegion">Busan</span>{" "}
              <span itemProp="postalCode">48520</span>
            </div>
            <div itemProp="addressCountry">South Korea</div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <a
            href="tel:+82-51-629-1111"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            itemProp="telephone"
          >
            +82-51-629-1111
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <a
            href="mailto:info@tongmyong.ac.kr"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            itemProp="email"
          >
            info@tongmyong.ac.kr
          </a>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-3">
          <Clock className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="text-muted-foreground" itemProp="openingHours">
            <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
            <div>Sat: 9:00 AM - 1:00 PM</div>
            <div>Sun: Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
