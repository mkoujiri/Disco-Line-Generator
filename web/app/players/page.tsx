"use client"
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { GetRoster } from "../components/actions";
import PlayerSelector from "../components/player-selector";
import { redirect } from "next/navigation";

export default function Players() {
  try {
    GetRoster().then((players) => {
      return <PlayerSelector players={players} />;
    });
    
  } catch (e) {
    redirect("/error");
  }
}