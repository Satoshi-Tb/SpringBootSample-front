import React, { useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import envConfig from "@/utils/envConfig";
import {
  CSVPostType,
  useUploadCsv,
} from "@/components/usecase/useCSVUploadMutator";
import { mutate } from "swr";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";

// ドロップゾーン用のインターフェース定義
interface DropzoneProps {
  isDragActive?: boolean;
  isDragReject?: boolean;
}

// スタイル付きのドロップゾーン
const DropzoneArea = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== "isDragActive" && prop !== "isDragReject",
})<DropzoneProps>(({ theme, isDragActive, isDragReject }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  borderWidth: 2,
  borderRadius: theme.shape.borderRadius,
  borderColor: isDragReject
    ? theme.palette.error.main
    : isDragActive
    ? theme.palette.primary.main
    : theme.palette.divider,
  borderStyle: "dashed",
  backgroundColor: isDragActive
    ? theme.palette.action.hover
    : theme.palette.background.paper,
  color: theme.palette.text.primary,
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  minHeight: 200,
}));

const CSVUploader = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // 再読込処理用
  const condition = useListSearchConditionState();

  const {
    trigger: uploadCsv,
    isMutating: isUploading,
    error: uploadError,
  } = useUploadCsv();

  console.log("uploadStatus", { isUploading, uploadError });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    // CSVファイルの検証
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      setAlert({
        open: true,
        message: "CSVファイル形式のみアップロード可能です",
        severity: "error",
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "text/csv": [".csv"],
      },
      maxFiles: 1,
    });

  const handleUpload = async () => {
    if (!file) return;

    const payload: CSVPostType = {
      file: file,
    };

    try {
      const result = await uploadCsv(payload);
      // アップロード成功時の処理
      setAlert({
        open: true,
        message: "ファイルのアップロードに成功しました",
        severity: "success",
      });
      // 選択ファイルをリセットし、ダイアログを閉じる
      handleClose();
      // 更新後データ再読込
      const key = [`${envConfig.apiUrl}/api/user/get/list-pager`, condition];
      mutate(key);
    } catch (e) {
      // エラーハンドリング
      setAlert({
        open: true,
        message: `エラー: ${
          e instanceof Error ? e.message : "不明なエラーが発生しました"
        }`,
        severity: "error",
      });
    }
  };

  const handleAlertClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
      >
        CSVファイルをアップロード
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>CSVファイルのアップロード</DialogTitle>
        <DialogContent>
          <DialogContentText>
            アップロードするCSVファイルをドラッグ＆ドロップするか、クリックして選択してください。
          </DialogContentText>

          <Box sx={{ mt: 2 }}>
            <DropzoneArea
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {file ? (
                <Typography variant="body1">
                  選択されたファイル: {file.name} (
                  {(file.size / 1024).toFixed(2)} KB)
                </Typography>
              ) : (
                <Typography variant="body1">
                  {isDragActive
                    ? "ファイルをここにドロップ"
                    : "ファイルをドラッグ＆ドロップ、またはクリックして選択"}
                </Typography>
              )}
            </DropzoneArea>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isUploading}>
            キャンセル
          </Button>
          <Button
            onClick={handleUpload}
            color="primary"
            variant="contained"
            disabled={!file || isUploading || uploadError}
            startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            {isUploading ? "アップロード中..." : "アップロード"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CSVUploader;
