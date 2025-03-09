import {
  TextField,
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useConditionHook } from "./ConditionHook";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { RiFileExcel2Line } from "react-icons/ri";
import envConfig from "@/utils/envConfig";
import { useState } from "react";

export const Condition = () => {
  // フォーム定義、アクション
  const {
    handleSubmit,
    onValid,
    control,
    showDetailButtonEnabled,
    handleBulkDelete,
    handleOnClickDetail,
    handleExcelDownload,
    handleBigExcelDownload,
    deleteError,
    realTimeUpdate,
    setRealTimeUpdate,
  } = useConditionHook();

  // 再読込処理用
  const condition = useListSearchConditionState();
  const { mutate } = useSWRMutator();

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
      }}
      autoComplete="off"
      onSubmit={handleSubmit(onValid)}
      display="flex"
      flexDirection="row"
    >
      {deleteError && <p>エラーが発生しました: {deleteError.message}</p>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          m: "0 5px",
        }}
      >
        <Typography variant="body2">ユーザーID</Typography>
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField hiddenLabel {...field} />}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          m: "0 5px",
        }}
      >
        <Typography variant="body2">ユーザー名</Typography>
        <Controller
          name="userName"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField hiddenLabel {...field} />}
        />
      </Box>

      <Box display="flex" sx={{ m: "5px" }} gap={1} alignItems="center">
        <Button type="submit" variant="contained">
          検索
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // 最新データ強制読み込み
            const key = [
              `${envConfig.apiUrl}/api/user/get/list-pager`,
              condition,
            ];
            mutate(key);
            console.log("reload! key:", key);
          }}
        >
          再読込
        </Button>
        <Button type="button" variant="contained" onClick={handleBulkDelete}>
          一括削除
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={handleOnClickDetail}
          disabled={showDetailButtonEnabled}
        >
          詳細
        </Button>
        <IconButton onClick={handleExcelDownload}>
          <RiFileExcel2Line />
        </IconButton>
        <Button
          type="button"
          variant="contained"
          onClick={handleBigExcelDownload}
        >
          巨大Excel
        </Button>
        <Link
          href="https://v5.mui.com/material-ui/all-components/"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="contained">MaterialUI</Button>
        </Link>
        <FormControlLabel
          label="リアルタイム更新"
          control={
            <Checkbox
              checked={realTimeUpdate}
              onChange={(e) => {
                if (e.target.checked) {
                  // リアルタイム有効にした時点の、最新データ強制読み込み
                  const key = [
                    `${envConfig.apiUrl}/api/user/get/list-pager`,
                    condition,
                  ];
                  mutate(key);
                }
                setRealTimeUpdate(e.target.checked);
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};
