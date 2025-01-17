import { Box, AppBar, Toolbar, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../public/Disco_stew_dive.png";

export default function TopBar() {
  return (
    <Stack direction={"row"} height={"100%"} justifyContent={"space-between"} alignItems={"center"} overflow={"hidden"} paddingX={2}>
      <Stack>
        <Typography variant={"h5"} color="primary">
          DiscoTech
        </Typography>
        <Typography variant="body2" color="primary">Smart Line Generator</Typography>
      </Stack>
      <Image src={logo} width={150} height={75} alt="disco stu" />
    </Stack>
  );
}
