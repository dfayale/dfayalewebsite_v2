import { CalendarDays, Instagram, Linkedin, Mail } from "lucide-react";
import imgStar from "../assets/star.png";

export default function Footer() {
  const socials = [
    {
      href: "https://www.instagram.com/dfayale",
      label: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      href: "https://www.linkedin.com/company/dfayale/",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      href: "mailto:yale@designforamerica.com",
      label: "Email",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      href: "https://luma.com/dfastudio",
      label: "Luma",
      icon: <CalendarDays className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="md:sticky md:bottom-0 z-0 overflow-hidden bg-dfa-ink text-dfa-paper px-8 md:px-16 lg:px-24 pt-16 md:pt-20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        {/* Contact column — sits to the left of the mark, clear of the crop */}
        <div className="flex flex-col gap-8 pb-10">
          <div className="flex gap-px bg-dfa-paper/20 border border-dfa-paper/20 self-start">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 bg-dfa-ink flex items-center justify-center text-dfa-paper/70 hover:text-dfa-ink hover:bg-dfa-paper transition-colors duration-150"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-dfa-paper/50">
            <p>
              Made with love by{" "}
              <span className="text-dfa-paper font-medium">DFAm</span>
            </p>
            <p>
              For partnership &amp; inquiries, email{" "}
              <a
                href="mailto:yale@designforamerica.com"
                className="text-dfa-paper/80 hover:text-white transition-colors duration-150"
              >
                yale@designforamerica.com
              </a>
            </p>
          </div>
        </div>

        {/*
          Wordmark lockup: set on two lines so the star can sit in the notch
          left of the A. The negative bottom margin lets the A bleed past the
          footer's bottom edge, where overflow-hidden crops it.
        */}
        <div
          aria-label="DFA"
          role="img"
          className="relative shrink-0 self-end -mb-[0.04em] select-none text-right font-bold uppercase leading-[0.78] tracking-[-0.03em] text-white text-[clamp(4.5rem,15vw,13rem)]"
        >
          <div>DF</div>
          <div>A</div>
          <img
            src={imgStar}
            alt=""
            aria-hidden="true"
            className="animate-star-spin pointer-events-none absolute right-[0.42em] top-[0.72em] w-[0.95em] h-auto"
          />
        </div>
      </div>
    </footer>
  );
}
