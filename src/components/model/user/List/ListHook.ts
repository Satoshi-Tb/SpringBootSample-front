import { useEffect, useState } from "react";
import { UserType, useUserList } from "@/components/usecase/useUserList";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import { GridColDef } from "@mui/x-data-grid";

// // サンプルグリッドデータ
// const sampleData = [
//   {
//     id: 1,
//     userId: "system@co.jp",
//     userName: "システム管理者",
//     birthday: "2000/01/01",
//     age: 21,
//     gender: "男性",
//   },
//   {
//     id: 2,
//     userId: "user@co.jp",
//     userName: "ユーザー1",
//     birthday: "2000/01/01",
//     age: 21,
//     gender: "女性",
//   },
// ];

export const useListHook = () => {
  const [rowData, setRowData] = useState<UserType[]>([]);

  // 検索条件
  const condition = useListSearchConditionState();

  // データ取得処理
  const { userListData, hasError, isLoading } = useUserList(condition);

  // グリッドのカラム定義
  const columns: GridColDef[] = [
    { field: "userId", headerName: "ユーザーID", width: 150 },
    { field: "userName", headerName: "ユーザー名", width: 150 },
    { field: "birthday", headerName: "誕生日", width: 130 },
    { field: "age", headerName: "年齢", width: 100 },
    { field: "genderName", headerName: "性別", width: 100 },
    {
      field: "department",
      headerName: "部署",
      width: 150,
      valueGetter: ({ row }) => {
        // ネストオブジェクトを表示する場合、valueGetterか、RenderCellを使う
        // 表示とソート＆フィルタで分けたい場合、valueFormatter（or RenderCell）とvalueGetterで分ける必要あり
        // ソート＆フィルタがセットのため、意外と分けると使いにくい。全て同じにしてよいと思う
        return row.department.departmentId;
      },
      renderCell: (params) => params.row.department.departmentName,
    },
  ];

  //TODO 暫定処理 ID列の修正
  useEffect(() => {
    if (!userListData || !userListData.data) return;
    const modData = userListData.data.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setRowData(modData);
  }, [userListData]);

  return { rowData, hasError, isLoading, columns };
};
