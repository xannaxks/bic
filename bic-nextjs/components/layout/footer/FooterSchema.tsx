"use client";

export function FooterSchema() {
  const schemaData = {
    "@context": "http://schema.org",
    "@type": "University",
    name: "Tongmyong University",
    alternateName: "TU",
    url: "https://www.tongmyong.ac.kr",
    logo: "https://www.tongmyong.ac.kr/images/tu-logo.png",
    image: "https://www.tongmyong.ac.kr/images/campus-main.jpg",
    description:
      "Leading private university in Busan, South Korea, known for innovation in education and research excellence.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "428 Sinseon-ro",
      addressLocality: "Nam-gu",
      addressRegion: "Busan",
      postalCode: "48520",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-51-629-1111",
      contactType: "customer service",
      email: "info@tongmyong.ac.kr",
    },
    sameAs: [
      "https://facebook.com/tongmyonguniversity",
      "https://twitter.com/tongmyong_edu",
      "https://instagram.com/tongmyong_university",
      "https://youtube.com/@TongmyongUniversity",
      "https://linkedin.com/school/tongmyong-university",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
