import React, { useState } from "react";
import { SimpleLayout } from "../../layout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import envConfig from "@/utils/envConfig";

export const Login = () => {
  const [userId, setUserId] = useState("");
  const [passowrd, setPassword] = useState("");

  const login = async () => {
    const input: RequestInfo | URL = `${envConfig.apiUrl}/api/auth/login`;
    try {
      const resp = await fetch(input);
      console.log("response", resp);
      window.location.href = "/top";
    } catch (e) {
      console.error("Request failed", e);
    }
  };

  return (
    <Box
      sx={{ marginTop: 2 }}
      component="form"
      onSubmit={() => {
        alert(`ボタン押下 userId:${userId} password:${passowrd}`);
      }}
    >
      <Grid container spacing={2}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignContent="center"
        >
          <Typography>ユーザID</Typography>
          <TextField
            placeholder="ユーザーID"
            value={userId}
            onChange={(event) => {
              event.preventDefault();
              setUserId(event.target.value);
            }}
          ></TextField>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignContent="center"
        >
          <Typography>パスワード</Typography>
          <TextField
            placeholder="パスワード"
            value={passowrd}
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
          ></TextField>
        </Box>
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
