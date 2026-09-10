import logoSevenEleven from "../assets/clients/7_Eleven_Horizontal_2022_RGB_thumb_1639377127_8824.png";
import logoLoreal from "../assets/clients/L'Oréal_logo.svg.webp";
import logoLenovo from "../assets/clients/Lenovo-Logo.png";
import logoLinkedin from "../assets/clients/LinkedIn_2021.svg";
import logoCanva from "../assets/collaborators/Canva_logo.svg.webp";
import logoFigma from "../assets/collaborators/Figma-Logo.png";
import logoAutodesk from "../assets/collaborators/autodesk.png";
import logoNotion from "../assets/collaborators/notion-logo.png";
import logoTsaiCity from "../assets/collaborators/tsai-city.png";

const clients = [
  { name: "7-Eleven", src: logoSevenEleven },
  { name: "Figma", src: logoFigma },
  { name: "L'Oréal", src: logoLoreal },
  { name: "Notion", src: logoNotion },
  { name: "Lenovo", src: logoLenovo },
  { name: "Canva", src: logoCanva },
  { name: "LinkedIn", src: logoLinkedin },
  { name: "Tsai CITY", src: logoTsaiCity },
  { name: "Autodesk", src: logoAutodesk },
];

export default function ClientMarquee() {
  return (
    <div className="group relative overflow-hidden">
      {/* Feathered edges so logos enter and leave instead of being chopped */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-dfa-paper to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-dfa-paper to-transparent"></div>

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            /* Copies past the first exist only to make the loop seamless */
            aria-hidden={copy > 0 || undefined}
          >
            {clients.map(({ name, src }) => (
              <li key={name} className="pr-16 md:pr-28">
                <img
                  src={src}
                  alt={name}
                  className="h-8 md:h-12 max-w-[160px] object-contain opacity-60 grayscale"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
