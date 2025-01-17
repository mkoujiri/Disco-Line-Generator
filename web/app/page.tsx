"use server";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default async function Home() {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={4} height={"100%"}>
      <Link href={"/players"}>
        <Button size="large" endIcon={<AssignmentIcon />} variant="contained" sx={{ height: "6rem", width: "20rem" }}>
          <Typography variant="h6">Set Roster</Typography>
        </Button>
      </Link>
      <Link href={"/lines"}>
        <Button size="large" endIcon={<AutoFixHighIcon/>} variant="contained" sx={{ height: "6rem", width: "20rem" }}>
          <Typography variant="h6">Generate Lines</Typography>
        </Button>
      </Link>
    </Stack>
  );
}
