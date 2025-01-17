"use server";
import { Button, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";

export default async function Error() {
  return (
    <Stack padding={1} height="100%">
      <Link href={"/"}>
        <Button startIcon={<NavigateBeforeIcon />} variant="outlined" sx={{ width: "25%" }}>
          Back
        </Button>
      </Link>
      <Stack height={"80%"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h5">Service Not Available</Typography>
        <Typography>Verify server is running, then retry.</Typography>
      </Stack>
    </Stack>
  );
}
