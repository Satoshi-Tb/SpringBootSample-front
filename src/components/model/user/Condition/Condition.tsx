import { TextField, Box, Button, IconButton } from "@mui/material";
import { Controller } from "react-hook-form";
import { useConditionHook } from "./ConditionHook";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { RiFileExcel2Line } from "react-icons/ri";

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
  } = useConditionHook();

  // 再読込処理用
  const condition = useListSearchConditionState();
  const { mutate } = useSWRMutator();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleSubmit(onValid)}
      display="flex"
    >
      {deleteError && <p>エラーが発生しました: {deleteError.message}</p>}
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
      <Box
        display="flex"
        alignContent="center"
        justifyContent="space-around"
        margin={2}
      >
        <Button type="submit" variant="contained" sx={{ margin: "2px" }}>
          検索
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "2px" }}
          onClick={() => {
            // 最新データ強制読み込み
            const key = `http://localhost:8080/api/user/get/list${condition}`;
            mutate(key);
            console.log("reload! key:", key);
          }}
        >
          再読込
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ margin: "2px" }}
          onClick={handleBulkDelete}
        >
          一括削除
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ margin: "2px" }}
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
          sx={{ margin: "2px" }}
          onClick={handleBigExcelDownload}
        >
          巨大Excel
        </Button>
      </Box>
    </Box>
  );
};
