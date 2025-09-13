import Head from "next/head";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
}

const defaultSEO = {
  siteName: "Tongmyong University",
  baseUrl: "https://www.tongmyong.ac.kr",
  defaultTitle: "Tongmyong University - Leading Innovation in Higher Education",
  defaultDescription:
    "Discover excellence in education at Tongmyong University, Busan's premier private university. Offering innovative programs, world-class research, and global opportunities for students from over 45 countries.",
  defaultImage: "/images/og-default.jpg",
  defaultKeywords:
    "Tongmyong University, Busan University, South Korea Education, Private University, International Programs, Higher Education, Research Excellence",
  twitterHandle: "@tongmyong_edu",
  facebookAppId: "",
};

export function SEOHead({
  title,
  description = defaultSEO.defaultDescription,
  keywords = defaultSEO.defaultKeywords,
  image = defaultSEO.defaultImage,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  canonical,
}: SEOProps) {
  const pathname = usePathname();
  const locale = useLocale();

  const fullTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;

  const fullUrl = `${defaultSEO.baseUrl}${pathname}`;
  const canonicalUrl = canonical || fullUrl;
  const imageUrl = image.startsWith("http")
    ? image
    : `${defaultSEO.baseUrl}${image}`;

  // Generate alternate language URLs
  const alternateLanguages = [
    {
      lang: "en",
      url: `${defaultSEO.baseUrl}/en${pathname.replace(`/${locale}`, "")}`,
    },
    {
      lang: "ko",
      url: `${defaultSEO.baseUrl}/ko${pathname.replace(`/${locale}`, "")}`,
    },
    {
      lang: "zh",
      url: `${defaultSEO.baseUrl}/zh${pathname.replace(`/${locale}`, "")}`,
    },
  ];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta
        property="og:locale"
        content={
          locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US"
        }
      />

      {/* Article-specific Open Graph tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Language Alternatives */}
      {alternateLanguages.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${defaultSEO.baseUrl}${pathname.replace(`/${locale}`, "")}`}
      />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="application-name" content={defaultSEO.siteName} />
      <meta name="apple-mobile-web-app-title" content={defaultSEO.siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Verification Meta Tags (to be filled with actual values) */}
      {/* <meta name="google-site-verification" content="verification-code" /> */}
      {/* <meta name="msvalidate.01" content="verification-code" /> */}
    </Head>
  );
}
