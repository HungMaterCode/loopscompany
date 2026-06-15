import Head from "next/head";
interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}
export const SEOHead: React.FC<SEOHeadProps> = ({ title = "LOOPS", description = "LOOPS Company", ogImage }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {ogImage && <meta property="og:image" content={ogImage} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Head>
);
