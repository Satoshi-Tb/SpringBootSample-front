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
import { useCSVUploadDialogHooks } from "./CSVUploadDialogHooks";

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

// type AlertInfo = { open: boolean; message: string; severity: AlertColor };

const CSVUploader = () => {
  const {
    open,
    file,
    alert,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isUploading,
    uploadError,
    handleClickOpen,
    handleClose,
    handleUpload,
    handleAlertClose,
  } = useCSVUploadDialogHooks();

  console.log("uploadStatus", { isUploading, uploadError });

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
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CSVUploader;
