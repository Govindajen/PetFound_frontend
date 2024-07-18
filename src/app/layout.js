import "../styles/globals.css";
import Providers from './provider';

export const metadata = {
  title: "PetFound",
  description: "Lost or Found a pet? Right place to start..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" key='html5'>
      <body key='htmlBody'>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  );
}