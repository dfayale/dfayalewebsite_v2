import { pastEvents, type PastEvent } from "../data/pastEvents";

type DatedEvent = PastEvent & { when: Date | null };

/*
 * Editorial calendar rhythm. Slots march left to right through a six-column
 * row; a false slot is left empty so the grid breathes the way a printed
 * listings page does instead of packing every cell. The pattern is fixed
 * (never random) so a given month always lays out the same way.
 */
const SLOT_RHYTHM = [
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
];

type Cell =
  | { kind: "event"; event: DatedEvent }
  | { kind: "blank"; key: string };

/**
 * A date-only string ("2026-04-18") parses as UTC midnight, which renders as
 * the previous day anywhere west of UTC. Pin it to local noon.
 */
function parseDay(value: string): Date | null {
  if (!value) return null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const COLUMNS = 6;

/**
 * Lay a year's events into the rhythm above, returning cells in grid order.
 * With `hangLast`, the oldest event is pushed to the right edge of its row —
 * used on the opening year so the block closes against the margin.
 */
function layOutYear(events: DatedEvent[], hangLast = false): Cell[] {
  const cells: Cell[] = [];
  let placed = 0;

  const rhythmCount = hangLast ? events.length - 1 : events.length;

  for (let slot = 0; placed < rhythmCount; slot++) {
    if (SLOT_RHYTHM[slot % SLOT_RHYTHM.length]) {
      cells.push({ kind: "event", event: events[placed] });
      placed++;
    } else {
      cells.push({ kind: "blank", key: `blank-${slot}` });
    }
  }

  if (hangLast) {
    while (cells.length % COLUMNS !== COLUMNS - 1) {
      cells.push({ kind: "blank", key: `pad-${cells.length}` });
    }
    cells.push({ kind: "event", event: events[events.length - 1] });
  }

  return cells;
}

export default function PastEventsGallery() {
  const dated: DatedEvent[] = pastEvents.map((event) => ({
    ...event,
    when: parseDay(event.date),
  }));

  /* Group by year, newest year first, undated events trailing */
  const years = new Map<string, DatedEvent[]>();
  for (const event of dated) {
    const key = event.when ? String(event.when.getFullYear()) : "undated";
    const bucket = years.get(key);
    if (bucket) bucket.push(event);
    else years.set(key, [event]);
  }

  const yearKeys = [...years.keys()].sort((a, b) => {
    if (a === "undated") return 1;
    if (b === "undated") return -1;
    return b.localeCompare(a);
  });

  /* Newest day first inside each year */
  for (const bucket of years.values()) {
    bucket.sort((a, b) => (b.when?.getTime() ?? 0) - (a.when?.getTime() ?? 0));
  }

  if (dated.length === 0) {
    return <div className="py-12 text-dfa-ink/60">No past events yet</div>;
  }

  return (
    <div className="space-y-12 md:space-y-16">
      {yearKeys.map((key, yearIndex) => {
        const yearEvents = years.get(key)!;

        return (
          <section key={key}>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-dfa-ink">
              {key === "undated" ? "Undated" : key}
            </h3>

            <div className="mt-6 pt-6 border-t border-dfa-ink/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 items-start">
              {layOutYear(yearEvents, yearIndex === 0).map((cell) =>
                cell.kind === "blank" ? (
                  /* Empty column — a rest in the grid, only worth the space on wide screens */
                  <div key={cell.key} aria-hidden className="hidden lg:block" />
                ) : (
                  <article key={`${cell.event.date}-${cell.event.name}`} className="group">
                    <div className="flex items-center gap-2 text-sm tabular-nums text-dfa-ink">
                      <span>
                        {cell.event.when
                          ? cell.event.when.toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                            })
                          : "--"}
                      </span>
                      <span className="w-[7px] h-[7px] bg-dfa-blue" />
                    </div>

                    {cell.event.image ? (
                      /* Full column width, height from the picture's own
                         proportions — nothing cropped, so a landscape shot
                         sits short and a portrait one runs tall */
                      <img
                        src={cell.event.image}
                        alt={cell.event.name}
                        loading="lazy"
                        className="mt-3 w-full h-auto grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                      />
                    ) : (
                      /* No image: the cell carries text alone, like a notice in a listings page */
                      cell.event.note && (
                        <p className="mt-3 text-sm leading-snug text-dfa-ink/70">
                          {cell.event.note}
                        </p>
                      )
                    )}

                    <div className="mt-3 text-sm leading-snug">
                      <h4 className="text-dfa-ink">{cell.event.name}</h4>
                      {cell.event.subtitle && (
                        <p className="text-dfa-ink/50">{cell.event.subtitle}</p>
                      )}
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
