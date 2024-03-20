import envConfig from "@/utils/envConfig";

export const getBigDataExcel = async () => {
  const response = await fetch(
    `${envConfig.apiUrl}/api/download/excel/bigdata`
  );

  if (!response.ok) {
    throw new Error(
      "response error:[" + response.status + "] " + response.statusText
    );
  }
  return response.blob(); // レスポンスをBlobとして取得
};
