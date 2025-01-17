import { GetRoster } from "../components/actions";
import PlayerSelector from "../components/player-selector";
import { redirect } from "next/navigation";

export default async function Players() {
  try {
    const players: RosterPlayer[] = await GetRoster();
    return <PlayerSelector players={players} />;
  } catch (e) {
    redirect("/error");
  }
}