"use server";
export const dynamic = 'force-dynamic';

import { GetRoster } from "../components/actions";
import PlayerSelector from "../components/player-selector";

export async function getServerSideProps() {
  try {
    const players: RosterPlayer[] = await GetRoster();
    return { props: { players } };
  } catch (e) {
    return { redirect: { destination: "/error", permanent: false } };
  }
}

export default async function Players({ players }: { players: RosterPlayer[] }) {
  return <PlayerSelector players={players} />;
}
