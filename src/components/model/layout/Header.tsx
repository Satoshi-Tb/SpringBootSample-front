import React from "react";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { FontSizeToggleButton } from "./FontSizeToggleButton";

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Box>
            <Typography variant="h6" noWrap>
              メニューバー
            </Typography>
          </Box>
          <Box>
            <FontSizeToggleButton />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
