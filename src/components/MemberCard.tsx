import { useState, useEffect } from "react";
import heic2any from "heic2any";

export default function MemberCard({
  name,
  major,
  role,
  coverImage,
}: {
  name: string;
  major: string;
  role: string;
  coverImage?: string;
}) {
  const [resolvedImage, setResolvedImage] = useState<string | undefined>(
    coverImage,
  );

  useEffect(() => {
    setResolvedImage(coverImage);
  }, [coverImage]);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | undefined;

    const convertHeic = async () => {
      if (!coverImage) return;
      const isHeic = /\.(heic|heif)$/i.test(coverImage.split("?")[0]);
      if (!isHeic) return;

      try {
        const response = await fetch(coverImage);
        const blob = await response.blob();
        const converted = await heic2any({
          blob,
          toType: "image/jpeg",
          quality: 0.9,
        });
        const convertedBlob = Array.isArray(converted)
          ? converted[0]
          : converted;
        objectUrl = URL.createObjectURL(convertedBlob as Blob);
        if (isMounted) {
          setResolvedImage(objectUrl);
        }
      } catch (error) {
        if (isMounted) {
          setResolvedImage(coverImage);
        }
      }
    };

    convertHeic();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [coverImage]);

  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-full aspect-square bg-dfa-ink/10 mb-4 transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden">
        {resolvedImage ? (
          <img
            src={resolvedImage}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          />
        ) : (
          /* Placeholder for member image */
          <div className="w-full h-full bg-dfa-ink/5 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 text-dfa-ink">
              <svg
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <h4 className="font-bold text-dfa-ink text-lg leading-tight mb-1">
        {name}
      </h4>
      <p className="text-sm text-dfa-ink/70 mb-1 h-10 flex items-center justify-center leading-tight px-2">
        {major}
      </p>
      <p className="text-xs font-bold text-dfa-blue uppercase tracking-wider">
        {role}
      </p>
    </div>
  );
}
