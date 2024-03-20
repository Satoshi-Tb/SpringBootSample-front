export const downloadExcel = (excelData: Blob, filename: string) => {
  console.log(
    new Date().toLocaleString() + " Excelダウンロード開始:" + filename
  );
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
    console.log(
      new Date().toLocaleString() + " Excelダウンロード完了:" + filename
    );
    // リンク使用後にオブジェクトを解放
    window.URL.revokeObjectURL(url);
  }
};
