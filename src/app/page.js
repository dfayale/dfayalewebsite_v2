import HomeHero from "./components/home-hero";
import ValueProps from "./components/value-props";
import ImpactStats from "./components/impact-stats";
import TeamPreview from "./components/team-preview";
import GetInvolved from "./components/get-involved";

export default function Home() {
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
