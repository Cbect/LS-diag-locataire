import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Diagnostic gratuit pour optimiser votre mise en location. Basé sur +6000 dossiers locatifs réels." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}