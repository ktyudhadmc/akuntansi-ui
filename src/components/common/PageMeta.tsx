import { HelmetProvider, Helmet } from "react-helmet-async";
import config from "@constants/config";

interface PageMetaProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const PageMeta = ({
  title,
  description = "",
  image = `${config.APP_URL}/og-image.png`,
  url = config.APP_URL,
  type = "website",
}: PageMetaProps) => {
  const fullTitle = `${title} - ${config.APP_NAME}`;
  const fullDescription = `${description} ${config.APP_NAME}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={config.APP_NAME} />
    </Helmet>
  );
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
