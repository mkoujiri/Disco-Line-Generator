"use server";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={4} height={"100%"}>
      <Link href={"/players"}>
        <Button variant="contained" sx={{ height: "6rem", width: "20rem" }}>
          <Typography variant="h6">Set Roster</Typography>
        </Button>
      </Link>
      <Link href={"/lines"}>
        <Button variant="contained" sx={{ height: "6rem", width: "20rem" }}>
          <Typography variant="h6">
            Generate Lines
          </Typography>
        </Button>
      </Link>
    </Stack>
  );
}
