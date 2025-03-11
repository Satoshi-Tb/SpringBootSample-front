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
    bulkDeleteButtonEnabled,
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
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <Typography variant="body2">ユーザーID</Typography>
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField hiddenLabel {...field} />}
        />

        <Typography variant="body2">ユーザー名</Typography>
        <Controller
          name="userName"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField hiddenLabel {...field} />}
        />
        <Button type="submit" variant="contained">
          検索
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        sx={{ m: "5px" }}
        gap={1}
        alignItems="center"
      >
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
        <Button
          type="button"
          variant="contained"
          onClick={handleBulkDelete}
          disabled={!bulkDeleteButtonEnabled}
        >
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
        <ExternalLinkButton href="https://v5.mui.com/material-ui/all-components/">
          Material UI V5
        </ExternalLinkButton>
        <ExternalLinkButton href="https://v5.mui.com/x/react-data-grid/">
          MUI-X DataGrid V5
        </ExternalLinkButton>
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

type ExternalLinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
    >
      <Button variant="contained">{children}</Button>
    </Link>
  );
};
