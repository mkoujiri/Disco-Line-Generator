import { Button, Card, Divider, Modal, Stack, Typography } from "@mui/material";

export default function ResetConfirmationModal(props: { open: boolean; handleConfirm: () => void; handleCancel: () => void }) {
  return (
    <Modal
      onClose={props.handleCancel}
      open={props.open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ paddingX: 2, paddingY: 1, height: "20%", width: "75%" }}>
        <Stack height={"100%"} justifyContent={"space-between"}>
          <Typography variant="h6">Confirm Reset Line Generator</Typography>
          <Typography>Reseting will clear all history and begin a new session.</Typography>
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Button variant="outlined" onClick={props.handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={props.handleConfirm}>Confirm</Button>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
}
