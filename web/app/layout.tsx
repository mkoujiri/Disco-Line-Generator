import { Box, Card, CssBaseline, Stack } from "@mui/material";
import ThemeRegistry from "./components/theme/theme-registry";
import TopBar from "./components/top-bar";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0 }}>
        <CssBaseline enableColorScheme />
        <ThemeRegistry>
          <Stack
            direction="column"
            sx={{
              height: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Stack direction="row" flex={1} sx={{ flexGrow: 1, overflow: "hidden" }}>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                }}
              >
                <Box sx={{ backgroundColor: "background.default" }} height={"100%"}>
                  <Box
                    height={"100%"}
                    sx={{
                      boxSizing: "border-box",
                      padding: { xs: ".5rem", sm: "1rem" },
                    }}
                  >
                    <Box height={"10%"}>
                      <TopBar/>
                    </Box>
                    <Card
                      sx={{
                        height: "90%",
                        overflowY: "auto",
                      }}
                    >
                      {props.children}
                    </Card>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </ThemeRegistry>
      </body>
    </html>
  );
}
