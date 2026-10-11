import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OrderModal } from '@/components/OrderModal';
import { FloatingCartButton } from '@/components/FloatingCartButton';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: "Royal Rajput | Imperial Pakistani Fine Dining & Charcoal BBQ",
  description: "Experience authentic Royal Rajput gastronomy: Mutton Dum Biryani, Desi Ghee Karahi, Peshawari Shinwari Lamb Chops, and live charcoal skewers. Order online across Pakistan.",
  keywords: ["Royal Rajput", "pakistani restaurant", "desi ghee karahi", "biryani pakistan", "royal pakistani food", "charcoal bbq islamabad", "lahori food"],
  openGraph: {
    title: "Royal Rajput | Imperial Pakistani Fine Dining",
    description: "Royal Mughal & Rajput Pakistani culinary legacy. Order fresh karahis, biryani & live BBQ with Daraz-style live order tracking.",
    url: "https://royalrajput.pk",
    siteName: "Royal Rajput Pakistan",
    images: [
      {
        url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Royal Rajput Imperial Dining",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Rajput | Imperial Pakistani Fine Dining",
    description: "Authentic desi ghee karahi and charcoal BBQ. Order online with live tracking.",
    images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-slate-900 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        <CartProvider>
          {/* Top Royal Navbar on every page */}
          <Navbar />

          {/* Page Body */}
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </main>

          {/* Global Footer on every page */}
          <Footer />

          {/* Global Floating Cart Trigger */}
          <FloatingCartButton />

          {/* Global Floating WhatsApp Quick Order & Inquiry */}
          <FloatingWhatsApp />

          {/* Global Order / Cart Checkout Modal */}
          <OrderModal />
        </CartProvider>
      </body>
    </html>
  );
}
