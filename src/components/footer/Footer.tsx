'use client';

export default function Footer() {
  return (
    <footer
      className="bg-espresso px-5 py-12 text-ivory md:px-10 md:py-16 xl:px-16"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Giant Lovable editorial wordmark */}
        <p className="font-display text-[clamp(5rem,17vw,16rem)] font-light uppercase leading-[0.75] tracking-tight text-ivory select-none">
          Lushè
        </p>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/20 pt-6 text-xs uppercase tracking-[0.14em] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LUSHÈ Beauty Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/lushe_beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blush transition-colors"
            >
              Instagram
            </a>
            <span>·</span>
            <a
              href="https://wa.me/918796783680"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blush transition-colors"
            >
              WhatsApp
            </a>
            <span>·</span>
            <a
              href="https://www.flexirl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blush transition-colors"
            >
              A site by flexirl.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
