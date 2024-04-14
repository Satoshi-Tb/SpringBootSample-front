import React from "react";
import {
  AppBar,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  useFontSizeMutators,
  useFontSizeState,
} from "@/components/store/useFontSizeState";
import { FontSizeType } from "@/TypeDef";

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

const FontSizeToggleButton = () => {
  const fontSize = useFontSizeState();
  const { setFontSize } = useFontSizeMutators();
  const handleSizeChange = (event: any, newSize: any) => {
    if (newSize !== null) {
      // ToggleButtonGroupが全て解除されるのを防ぐ
      setFontSize(newSize as FontSizeType);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        value={fontSize}
        exclusive
        onChange={handleSizeChange}
        aria-label="text size"
      >
        <ToggleButton
          value="small"
          aria-label="small"
          sx={{ borderColor: "white" }}
        >
          <Typography sx={{ color: "white" }}>小</Typography>
        </ToggleButton>
        <ToggleButton
          value="medium"
          aria-label="medium"
          sx={{ borderColor: "white" }}
        >
          <Typography sx={{ color: "white" }}>中</Typography>
        </ToggleButton>
        <ToggleButton
          value="large"
          aria-label="large"
          sx={{ borderColor: "white" }}
        >
          <Typography sx={{ color: "white" }}>大</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
