import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Icons */}
      <link
        rel="icon"
        type="image/ico"
        sizes="64x64"
        href={asset("/favicon-64x64.ico")}
      />
      <link
        rel="icon"
        type="image/ico"
        sizes="16x16"
        href={asset("/favicon-64x64.ico")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-64x64.ico")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#221E1F" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* latin-ext */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/Lato/Lato-Regular.ttf")
          }) format('truetype');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 900;
            font-display: swap;
            src: url(${
            asset("/fonts/Lato/Lato-Black.ttf")
          }) format('truetype');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }       
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
