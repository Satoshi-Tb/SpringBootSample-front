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
import React, { useState, useEffect } from "react";
import useSWR from "swr";

type BasicResponseType = {
  code: string;
  message: string;
};

type UserListType = {};

export const List = () => {
  const [condition, setCondition] = useState("");
  const [rowData, setRowData] = useState<any[]>([]);

  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/user/get/list${condition}`,
    fetcher
  );
  console.log("fetch data", data);

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

  //TODO 暫定処理 ID列の修正
  useEffect(() => {
    if (!data || !data.userList) return;
    const prevData = data.userList as any[];
    const modData = prevData.map((item, i) => {
      item.id = i;
      return item;
    });
    console.log("mod data", modData);
    setRowData(modData);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
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
        <DataGrid columns={columns} rows={rowData} disableRowSelectionOnClick />
      </Paper>
    </Container>
  );
};
