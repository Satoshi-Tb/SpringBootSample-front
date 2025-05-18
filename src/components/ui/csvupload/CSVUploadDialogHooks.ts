import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import {
  CSVPostType,
  useUploadCsv,
} from "@/components/usecase/useCSVUploadMutator";
import envConfig from "@/utils/envConfig";
import { AlertColor } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { mutate } from "swr";

type AlertInfo = { open: boolean; message: string; severity: AlertColor };

export const useCSVUploadDialogHooks = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<AlertInfo>({
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
      // CSVファイルアップロード処理（非同期実施）
      uploadCsv(payload, {
        onSuccess(data, key, config) {
          console.log("success uploadCsv", { data, key, config });
          setAlert({
            open: true,
            message: "ファイルのアップロードが完了しました",
            severity: "success",
          });
          // 更新後データ再読込
          const mutateKey = [
            `${envConfig.apiUrl}/api/user/get/list-pager`,
            condition,
          ];
          mutate(mutateKey);
        },
        onError(err, key, config) {
          console.log("error uploadCsv", { err, key, config });
          setAlert({
            open: true,
            message: `ファイルのアップロードに失敗しました: ${
              err instanceof Error ? err.message : "不明なエラーが発生しました"
            }`,
            severity: "error",
          });
        },
      });
      // アップロード成功時の処理
      setAlert({
        open: true,
        message: "ファイルのアップロードを受け付けました",
        severity: "success",
      });
      // 選択ファイルをリセットし、ダイアログを閉じる
      handleClose();
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

  return {
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
  };
};
