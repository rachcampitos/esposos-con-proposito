import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Esposos con Propósito",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide site chrome (header, footer) when studio is active */}
      <style>{`
        header, footer, .page-transition-wrapper > main > :not(#sanity-studio) {
          display: none !important;
        }
        .page-transition-wrapper {
          all: unset !important;
        }
      `}</style>
      <div
        id="sanity-studio"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overscrollBehavior: "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
