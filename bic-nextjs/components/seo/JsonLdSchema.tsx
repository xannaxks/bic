interface SchemaProps {
  schema: object;
}

export function JsonLdSchema({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// University Organization Schema
export function UniversitySchema() {
  const universitySchema = {
    "@context": "https://schema.org",
    "@type": "University",
    name: "Tongmyong University",
    alternateName: ["TU", "동명대학교"],
    url: "https://www.tongmyong.ac.kr",
    logo: "https://www.tongmyong.ac.kr/images/tu-logo.png",
    image: "https://www.tongmyong.ac.kr/images/campus-main.jpg",
    description:
      "Leading private university in Busan, South Korea, known for innovation in education and research excellence.",
    foundingDate: "1981",
    address: {
      "@type": "PostalAddress",
      streetAddress: "428 Sinseon-ro",
      addressLocality: "Nam-gu",
      addressRegion: "Busan",
      postalCode: "48520",
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.1363,
      longitude: 129.0861,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+82-51-629-1111",
        contactType: "customer service",
        email: "info@tongmyong.ac.kr",
        availableLanguage: ["English", "Korean", "Chinese"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+82-51-629-1234",
        contactType: "admissions",
        email: "admissions@tongmyong.ac.kr",
        availableLanguage: ["English", "Korean", "Chinese"],
      },
    ],
    sameAs: [
      "https://facebook.com/tongmyonguniversity",
      "https://twitter.com/tongmyong_edu",
      "https://instagram.com/tongmyong_university",
      "https://youtube.com/@TongmyongUniversity",
      "https://linkedin.com/school/tongmyong-university",
    ],
    member: {
      "@type": "EducationalOrganization",
      memberOf: "Korea Council for University Education",
    },
    department: [
      {
        "@type": "CollegeOrUniversity",
        name: "College of Engineering",
        url: "https://www.tongmyong.ac.kr/colleges/engineering",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "College of Business Administration",
        url: "https://www.tongmyong.ac.kr/colleges/business",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "College of Liberal Arts",
        url: "https://www.tongmyong.ac.kr/colleges/liberal-arts",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "University Accreditation",
      recognizedBy: "Ministry of Education, South Korea",
    },
  };

  return <JsonLdSchema schema={universitySchema} />;
}

// Course/Program Schema
export function CourseSchema({
  name,
  description,
  provider,
  courseCode,
  educationalLevel,
  timeRequired,
  occupationalCategory,
}: {
  name: string;
  description: string;
  provider?: string;
  courseCode?: string;
  educationalLevel?: string;
  timeRequired?: string;
  occupationalCategory?: string[];
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: name,
    description: description,
    provider: {
      "@type": "University",
      name: provider || "Tongmyong University",
      url: "https://www.tongmyong.ac.kr",
    },
    courseCode: courseCode,
    educationalLevel: educationalLevel || "UndergraduateLevel",
    timeRequired: timeRequired,
    occupationalCategory: occupationalCategory || [],
    coursePrerequisites: "High school diploma or equivalent",
    educationalCredentialAwarded: "Bachelor's Degree",
    teaches: description,
    inLanguage: ["en", "ko"],
    availableLanguage: ["English", "Korean"],
  };

  return <JsonLdSchema schema={courseSchema} />;
}

// Event Schema
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  eventStatus = "EventScheduled",
  eventAttendanceMode = "OfflineEventAttendanceMode",
  image,
  offers,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  organizer?: string;
  eventStatus?: string;
  eventAttendanceMode?: string;
  image?: string;
  offers?: Record<string, string | number | boolean>;
}) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    eventStatus: `https://schema.org/${eventStatus}`,
    eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
    location: {
      "@type": "Place",
      name: location || "Tongmyong University Campus",
      address: {
        "@type": "PostalAddress",
        streetAddress: "428 Sinseon-ro",
        addressLocality: "Nam-gu",
        addressRegion: "Busan",
        postalCode: "48520",
        addressCountry: "KR",
      },
    },
    image: image || "https://www.tongmyong.ac.kr/images/campus-main.jpg",
    organizer: {
      "@type": "University",
      name: organizer || "Tongmyong University",
      url: "https://www.tongmyong.ac.kr",
    },
    offers: offers || {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
  };

  return <JsonLdSchema schema={eventSchema} />;
}

// Article Schema
export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = "Tongmyong University",
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || publisher,
    },
    publisher: {
      "@type": "University",
      name: publisher,
      logo: {
        "@type": "ImageObject",
        url: "https://www.tongmyong.ac.kr/images/tu-logo.png",
      },
    },
  };

  return <JsonLdSchema schema={articleSchema} />;
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdSchema schema={breadcrumbSchema} />;
}
