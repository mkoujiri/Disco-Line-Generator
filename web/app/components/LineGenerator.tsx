"use client";
import { Box, Button, Card, Checkbox, Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GenerateLine, UpdateRoster } from "./actions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function LineGenerator() {
  const [line, setLine] = useState<String[]>([]);
  const router = useRouter();

  return (
    <Stack padding={1} spacing={1}>
      <Button startIcon={<NavigateBeforeIcon />} variant="outlined" onClick={() => router.push("/")} sx={{ width: "25%" }}>
        Back
      </Button>
      <Typography variant="h5">Line Generator</Typography>
      <Button variant="contained" onClick={() => GenerateLine().then((result) => setLine(result))}>
        Next Line
      </Button>
      <Stack>
        {line.map((player, index) => (
          <Box key={index} border={1} padding={1}>
            <Typography variant="subtitle1">{player}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
