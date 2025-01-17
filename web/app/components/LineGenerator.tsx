"use client";
import { Box, Button, Card, Checkbox, Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GenerateFakeLine, GenerateLine, ResetGenerator } from "./actions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ResetConfirmationModal from "./reset-confirmation-modal";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function LineGenerator() {
  const [line, setLine] = useState<Line>({ oline: [], dline: [] });
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleNextLine = async () => {
    try {
      const result = await GenerateLine();
      setLine(result);
    } catch (e) {
      router.push("/error");
    }
  };

  const handleReset = async () => {
    try {
      await ResetGenerator();
      setResetModalOpen(false);
    } catch (e) {
      router.push("/error");
    }
  };

  return (
    <Box>
      <ResetConfirmationModal open={resetModalOpen} handleCancel={() => setResetModalOpen(false)} handleConfirm={handleReset} />
        
      <Stack padding={1} spacing={1}>
        <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
          <Button startIcon={<NavigateBeforeIcon />} variant="outlined" onClick={() => router.push("/")} sx={{ width: "25%" }}>
            Back
          </Button>
          <Button endIcon={<RefreshIcon />} variant="contained" onClick={() => setResetModalOpen(true)} sx={{ width: "25%" }}>
            Reset
          </Button>
        </Stack>

        <Typography variant="h5">Line Generator</Typography>

        <Button size="large" variant="contained" onClick={handleNextLine}>
          Next Line
        </Button>

        <Stack>
          {line.dline.length > 0 && (
            <Box border={2} borderColor={"primary.main"} padding={1}>
              <Typography color="primary.main" variant="h5">
                O Line
              </Typography>
            </Box>
          )}
          {line.oline.map((player, index) => (
            <Box key={index} border={1} padding={1}>
              <Typography variant="subtitle1">{player}</Typography>
            </Box>
          ))}
        </Stack>

        <Stack>
          {line.dline.length > 0 && (
            <Box border={2} borderColor={"primary.main"} padding={1}>
              <Typography color="primary.main" variant="h5">
                D Line
              </Typography>
            </Box>
          )}
          {line.dline.map((player, index) => (
            <Box key={index} border={1} padding={1}>
              <Typography variant="subtitle1">{player}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
