import React from "react";
import { SimpleLayout } from "../../layout";
import { Box, Button, Grid, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Box
      sx={{ marginTop: 2 }}
      component="form"
      onSubmit={() => {
        alert("ボタン押下");
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography>ユーザID</Typography>
        </Grid>
        <Grid item md={8}></Grid>
        <Grid item md={4}>
          <Typography>パスワード</Typography>
        </Grid>
        <Grid item md={8}></Grid>
        <Grid item xs={4}>
          <Typography>ユーザー名</Typography>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Button variant="contained" sx={{ marginRight: 1 }} type="submit">
              ログイン
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
