"use client";
import { Box, Button, Card, Checkbox, Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateRoster } from "./actions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function PlayerSelector(props: { players: RosterPlayer[] }) {
  const [selectedPlayers, setSelectedPlayers] = useState<RosterPlayer[]>(props.players);
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
        {selectedPlayers.map((player, index) => (
          <Stack direction="row" alignItems="center" key={index}>
            <Checkbox
              checked={player.selected}
              onClick={() => {
                // thanks chatgpt
                const updatedPlayers = [...selectedPlayers]; // Create a shallow copy of the array
                updatedPlayers[index].selected = !updatedPlayers[index].selected; // Toggle the selected property
               setSelectedPlayers(updatedPlayers); // Set the updated array as the new state
              }}
            />
            <Typography>{player.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
