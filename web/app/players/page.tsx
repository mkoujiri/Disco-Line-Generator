"use server";
import { GetRoster } from "../components/actions";
import PlayerSelector from "../components/player-selector";

export default async function Players() {
  const players: RosterPlayer[] = await GetRoster();
  return <PlayerSelector players={players} />;
}
