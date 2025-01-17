"use client";
import { Box, Button, Card, Checkbox, Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateRoster } from "./actions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function PlayerSelector(props: { players: RosterPlayer[] }) {
  const [selectedPlayers, setSelectedPlayers] = useState<String[]>([]);
  const router = useRouter();
  return (
    <Stack padding={1} spacing={1}>
      <Button startIcon={<NavigateBeforeIcon />} variant="outlined" onClick={() => router.push("/")} sx={{ width: "25%" }}>
        Back
      </Button>
      <Typography variant="h5">Select Players</Typography>
      <Button
        variant="contained"
        onClick={() => {
          UpdateRoster(selectedPlayers);
          router.push("/");
        }}
      >
        Submit
      </Button>
      <Stack>
        {props.players.map((player, index) => (
          <Stack direction="row" alignItems="center" key={index}>
            <Checkbox
              value={selectedPlayers.includes(player.name)}
              onClick={() => setSelectedPlayers([player.name, ...selectedPlayers])}
              sx={{ colorAdjust: "yellow" }}
            />
            <Typography>{player.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
