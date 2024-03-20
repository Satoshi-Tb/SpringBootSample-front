export const downloadExcel = (excelData: Blob, filename: string) => {
  // ファイルダウンロードのためのURLを作成
  const url = window.URL.createObjectURL(excelData);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // ダウンロードするファイルの名前
    document.body.appendChild(link);
    link.click();

    // 後処理
    link.remove();
  } finally {
    // リンク使用後にオブジェクトを解放
    window.URL.revokeObjectURL(url);
  }
};
