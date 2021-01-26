import Head from 'next/head';
import Footer from './footer';

type Props = {
  children: any;
  home?: boolean;
};

const Layout = ({ children, home }: Props) => {
  return (
    <>
      <Head>
        <meta property="og:description" content="chanmakoの備忘録"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="@chan_makotoo"></meta>
        <meta name="twitter:creator" content="@chan_makotoo"></meta>
        <meta name="twitter:description" content="chanmakoの備忘録"></meta>
        <link
          rel="icon"
          type="image/png"
          href="https://images.microcms-assets.io/protected/ap-northeast-1:d11e3873-6289-451e-ad68-f083cfed4f2e/service/chanmako/media/favicon.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://images.microcms-assets.io/protected/ap-northeast-1:d11e3873-6289-451e-ad68-f083cfed4f2e/service/chanmako/media/favicon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://images.microcms-assets.io/protected/ap-northeast-1:d11e3873-6289-451e-ad68-f083cfed4f2e/service/chanmako/media/favicon.png"
          sizes="192x192"
        />
      </Head>
      <main>{children}</main>
      {home === true ? <></> : <Footer />}
    </>
  );
};

export default Layout;
