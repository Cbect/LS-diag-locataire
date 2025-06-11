import "./globals.css";

export const metadata = {
  title: "Diagnostic Express LocService",
  description: "Scoring Interactif basé sur +6 000 dossiers locatifs réels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
