import useSWRMutation from "swr/mutation";
import envConfig from "@/utils/envConfig";

export type CSVPostType = {
  file: File;
};

export type UserDeleteType = {
  userIdList: string[];
};

// CSVファイルアップロード
export const useUploadCsv = () => {
  // フェッチャーの実装
  // 追加の引数は第二引数の `arg` プロパティとして渡されます
  const uploadCsv = async (url: string, { arg }: { arg: CSVPostType }) => {
    const formData = new FormData();
    formData.append("file", arg.file);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text(); // または res.json() に応じて調整
      throw new Error(errorText || `Upload failed with status ${res.status}`);
    }
  };

  return useSWRMutation(`${envConfig.apiUrl}/api/upload-csv`, uploadCsv);
};
