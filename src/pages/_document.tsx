import Document, { Html, Head, Main, NextScript } from 'next/document';

type CustomDocumentInterface = {
  url: string;
  // title: string;
  description: string;
};

class CustomDocument extends Document implements CustomDocumentInterface {
  url = 'https://chanmako.com';
  sitename = 'chanmako.com';
  description = 'chanmakoの備忘録';

  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="description" content={this.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.sitename} />
          <meta property="og:image" content={`${this.url}/ogp.png`} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={this.description} />
          <meta name="twitter:image" content={`${this.url}/ogp.png`}></meta>
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
