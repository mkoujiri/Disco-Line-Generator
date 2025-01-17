"use client";
import { useEffect, useState } from "react";
import { GetRoster } from "../components/actions";
import PlayerSelector from "../components/player-selector";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function Players() {
  const [players, setPlayers] = useState<RosterPlayer[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const playersData = await GetRoster();
        setPlayers(playersData);
      } catch (e) {
        router.push("/error");
      }
    }

    fetchPlayers();
  }, [router]);

  return <PlayerSelector players={players} />;
}
