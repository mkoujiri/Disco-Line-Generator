import { Box, AppBar, Toolbar, Card, Stack, Typography } from "@mui/material";
import Image from 'next/image'
import logo from '../../public/Disco_stew_dive.png'

export default function TopBar() {
  return (
    <Stack direction={"row"} height={"100%"} justifyContent={"space-between"} alignItems={"center"} overflow={"hidden"} paddingX={2}>
      <Image
      src={logo}
      width={200}
      height={100}
      alt="disco stu"
    />
      <Stack>
        <Typography variant={"h4"} color="primary">DiscoTech</Typography>
        <Typography color="primary">Smart Line Generator</Typography>
      </Stack>
    </Stack>
  );
}
