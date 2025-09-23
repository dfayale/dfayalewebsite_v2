import HomeHero from "./components/home-hero";
import ValueProps from "./components/value-props";
import ImpactStats from "./components/impact-stats";
import TeamPreview from "./components/team-preview";
import GetInvolved from "./components/get-involved";

export default function Home() {
  const finalPhrase = "Great things are coming";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const typeDelay = 80; // ms per character while typing
    const pauseBeforeBack = 900; // pause after full phrase
    const backDelay = 55; // ms per character while deleting

    const timeouts = [];

    // Type forward
    for (let i = 1; i <= finalPhrase.length; i++) {
      timeouts.push(
        setTimeout(() => setTyped(finalPhrase.slice(0, i)), i * typeDelay)
      );
    }

    const afterType = finalPhrase.length * typeDelay + pauseBeforeBack;

    // Backspace
    for (let i = finalPhrase.length - 1; i >= 0; i--) {
      const step = finalPhrase.length - i;
      timeouts.push(
        setTimeout(() => setTyped(finalPhrase.slice(0, i)), afterType + step * backDelay)
      );
    }

    // After animation completes, show final phrase again for readability
    const total = afterType + finalPhrase.length * backDelay + 300;
    timeouts.push(
      setTimeout(() => setTyped(finalPhrase), total)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [finalPhrase]);
  return (
    <>
      <HomeHero />
      <ImpactStats />
      <ValueProps />
      <TeamPreview />
      <GetInvolved />
    </>
  );
}
