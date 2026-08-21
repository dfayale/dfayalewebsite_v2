/* September 2026 recruitment calendar, trimmed to the two weeks that hold
   every event. Sep 6 is a Sunday, so both weeks are full Su-Sa rows. */
const RANGE_START = 6;
const RANGE_DAYS = 14;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SPRINT_START = 10;
const SPRINT_END = 18;

const events: Array<{
  day: number;
  name: string;
  time?: string;
  location?: string;
  deadline?: boolean;
}> = [
  { day: 8, name: "DFA info session", time: "8:00 PM", location: "CEID" },
  { day: 10, name: "Sprint launch event", time: "8:00 PM", location: "CEID" },
  { day: 15, name: "Office hour", time: "8:00 PM", location: "CEID" },
  { day: 18, name: "Application due", deadline: true },
];

const eventByDay = new Map(events.map((e) => [e.day, e]));

export default function SprintCalendar() {
  const cells = Array.from(
    { length: RANGE_DAYS },
    (_, i) => RANGE_START + i,
  );

  return (
    <div>
      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] text-dfa-ink/40 mb-4">
        September 2026
      </h4>

      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-dfa-ink/40 text-center pb-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-dfa-ink/15 border border-dfa-ink/15">
        {cells.map((day) => {
          const event = eventByDay.get(day);
          const inSprint = day >= SPRINT_START && day <= SPRINT_END;
          return (
            <div
              key={day}
              className={`h-28 md:h-40 p-1.5 md:p-3 ${
                event?.deadline
                  ? "bg-red-500/10"
                  : inSprint
                    ? "bg-dfa-blue/10"
                    : "bg-white"
              }`}
            >
              <span
                className={`text-sm md:text-lg tabular-nums ${
                  event?.deadline
                    ? "font-bold text-red-600"
                    : event
                      ? "font-bold text-dfa-blue"
                      : "font-normal text-dfa-ink/50"
                }`}
              >
                {day}
              </span>
              {event && (
                <>
                  <span
                    className={`block mt-1 md:mt-2 text-[10px] md:text-sm leading-tight font-bold hyphens-auto ${
                      event.deadline ? "text-red-600" : "text-dfa-ink"
                    }`}
                  >
                    {event.name}
                  </span>
                  {event.time && (
                    <span className="hidden md:block mt-1 text-xs text-dfa-ink/60">
                      {event.time}
                      {event.location && ` · ${event.location}`}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-3 text-sm text-dfa-ink/60">
        <span
          className="inline-block w-4 h-4 bg-dfa-blue/10 border border-dfa-ink/15 shrink-0"
          aria-hidden="true"
        />
        Design Sprint &middot; Sep 10 &rarr; Sep 18
      </p>
    </div>
  );
}
