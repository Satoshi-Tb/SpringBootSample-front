import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { BaseLayout } from "../../layout";

export const List = () => {
  // グリッドデータ
  const sampleData = [
    {
      id: 1,
      userId: "system@co.jp",
      userName: "システム管理者",
      birthday: "2000/01/01",
      age: 21,
      gender: "男性",
    },
    {
      id: 2,
      userId: "user@co.jp",
      userName: "ユーザー1",
      birthday: "2000/01/01",
      age: 21,
      gender: "女性",
    },
  ];

  // グリッドのカラム定義
  const columns = [
    { field: "userId", headerName: "ユーザーID", width: 150 },
    { field: "userName", headerName: "ユーザー名", width: 150 },
    { field: "birthday", headerName: "誕生日", width: 130 },
    { field: "age", headerName: "年齢", width: 100 },
    { field: "gender", headerName: "性", width: 100 },
  ];

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ユーザー一覧
        </Typography>
        <Divider />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          autoComplete="off"
        >
          <TextField id="user-id" label="ユーザーID" defaultValue="" />
          <TextField id="user-name" label="ユーザー名" defaultValue="" />
          <Button variant="contained">検索</Button>
        </Box>
        <Divider />
        <DataGrid
          columns={columns}
          rows={sampleData}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
};
