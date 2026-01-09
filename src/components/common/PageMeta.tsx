import { HelmetProvider, Helmet } from "react-helmet-async";
import config from "@constants/config";
const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <Helmet>
    <title>
      {title} - {config.APP_NAME}
    </title>
    <meta name="description" content={`${description} - ${config.APP_NAME}`} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
