import {
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useConditionHook } from "./ConditionHook";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { RiFileExcel2Line } from "react-icons/ri";
import envConfig from "@/utils/envConfig";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useState } from "react";
import { SearchConditionDialog } from "../SearchConditionDialog/SearchConditionDialog";

export const Condition = () => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  // フォーム定義、アクション
  const {
    showDetailButtonEnabled,
    handleBulkDelete,
    handleOnClickDetail,
    handleExcelDownload,
    handleBigExcelDownload,
    deleteError,
    realTimeUpdate,
    setRealTimeUpdate,
    bulkDeleteButtonEnabled,
    searchActivated,
    clearSearchCondition,
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
      display="flex"
      flexDirection="row"
    >
      {deleteError && <p>エラーが発生しました: {deleteError.message}</p>}
      <Box
        display="flex"
        flexWrap="wrap"
        sx={{ m: "5px" }}
        gap={1}
        alignItems="center"
      >
        <IconButton
          onClick={() => {
            setOpenSearchDialog(true);
          }}
        >
          <SearchIcon />
        </IconButton>
        {searchActivated && (
          <IconButton onClick={clearSearchCondition}>
            <SearchOffIcon />
          </IconButton>
        )}
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
      <SearchConditionDialog
        open={openSearchDialog}
        setOpen={setOpenSearchDialog}
      />
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
