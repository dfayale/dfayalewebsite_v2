import { NotionEvent, formatDate } from "../utils/notionApi";
import imgEventCard from "../assets/fe8eb4892c77866d59179faff9a17510b32333bf.png";

export default function EventCard({ event }: { event: NotionEvent | any }) {
  // Handle both Notion events and legacy events
  const title = event.title || event.name || "Event";
  const host = event.host || event.subtitle || "";
  const description = event.description || "";
  const image = event.image || imgEventCard;
  const location = event.location || "";
  const date = event.date ? formatDate(event.date) : "";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-dfa-ink/10 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-dfa-ink/5">
        <div className="flex-1 min-w-0">
          <h4
            className="font-bold text-dfa-ink text-lg leading-tight truncate"
            title={title}
          >
            {title}
          </h4>
          <p className="text-sm text-dfa-ink/60 truncate" title={host}>
            {host}
          </p>
        </div>
      </div>
      <div className="h-48 bg-dfa-paper relative shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-dfa-ink/10 text-dfa-ink/40">
            No image
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm text-dfa-ink/60 mb-4 space-y-1">
          {location && (
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
          )}
          {date && (
            <p>
              <span className="font-semibold">Time:</span> {date}
            </p>
          )}
        </div>
        <p className="text-dfa-ink/80 text-sm mt-auto">{description}</p>
      </div>
    </div>
  );
}
