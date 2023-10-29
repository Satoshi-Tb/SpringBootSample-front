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
import { Controller } from "react-hook-form";
import { useListHook } from "./ListHook";
import { UserListType, useUserList } from "@/components/usecase/useUserList";

export const List = () => {
  const [condition, setCondition] = useState("");
  const [rowData, setRowData] = useState<UserListType[]>([]);

  // データ取得処理
  const { userListData, hasError, isLoading } = useUserList(condition);

  // フォーム定義、アクション
  const { handleSubmit, onValid, control } = useListHook(setCondition);

  // サンプルグリッドデータ
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
    if (!userListData || !userListData.data) return;
    const modData = userListData.data.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setRowData(modData);
  }, [userListData]);

  if (hasError) return <div>failed to load</div>;
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
          onSubmit={handleSubmit(onValid)}
        >
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="ユーザーID" {...field} />}
          />
          <Controller
            name="userName"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="ユーザー名" {...field} />}
          />
          <Button type="submit" variant="contained">
            検索
          </Button>
        </Box>
        <Divider />
        <DataGrid columns={columns} rows={rowData} disableRowSelectionOnClick />
      </Paper>
    </Container>
  );
};
