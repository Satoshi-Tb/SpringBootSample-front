import { useEffect, useState } from "react";
import { UserType, useUserList } from "@/components/usecase/useUserList";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";
import {
  GridColDef,
  GridPaginationModel,
  GridPreProcessEditCellProps,
} from "@mui/x-data-grid";
import {
  useListPageOffsetMutators,
  useListRowsPerPageMutators,
} from "@/components/store/useUserListPaginationState";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useUpdateUser } from "@/components/usecase/useUserMutator";

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
  // 画面データ
  const [rowData, setRowData] = useState<UserType[]>([]);
  // 検索データ件数
  const [rowCount, setRowCount] = useState<number>(0);
  // 選択ページ
  const { setUserListPageOffset } = useListPageOffsetMutators();
  // ページサイズ
  const { setUserListRowsPerPage } = useListRowsPerPageMutators();
  // 検索条件
  const condition = useListSearchConditionState();
  //再読込
  const { mutate } = useSWRMutator();
  // データ取得処理
  const { userListData, hasError, isLoading } = useUserList(condition);
  // 更新処理
  const { trigger: updateUser, error, data } = useUpdateUser();

  // グリッドのカラム定義
  const columns: GridColDef[] = [
    { field: "userId", headerName: "ユーザーID", width: 150 },
    {
      field: "userName",
      headerName: "ユーザー名",
      width: 150,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
    },
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

  // ページサイズ／ページチェンジイベント
  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    setUserListPageOffset(newPaginationModel.page);
    setUserListRowsPerPage(newPaginationModel.pageSize);
  };

  // セル編集処理
  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    console.log("new row", newRow);
    console.log("old row", oldRow);

    try {
      const result = await updateUser({
        id: newRow.id,
        userId: newRow.userId,
        userName: newRow.userName,
        password: newRow.password,
      });
      console.log("更新結果", result);
      console.log("更新データ", data);

      // 更新後データ再読込
      console.log("condition", condition);
      const key = `http://localhost:8080/api/user/get/list-pager${condition}`;
      mutate(key);

      // DB更新が成功した場合、新しい行データを返してグリッドにコミットする
      return newRow;
    } catch (e) {
      console.log(e);
      // DB更新に失敗した場合は、変更を破棄する
      return oldRow;
    }
  };

  //TODO 暫定処理 ID列の修正
  useEffect(() => {
    if (!userListData || !userListData.data) return;
    const modData = userListData.data.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setRowData(modData);
    setRowCount(userListData.totalCount);
  }, [userListData]);

  return {
    rowData,
    rowCount,
    hasError,
    isLoading,
    columns,
    handlePaginationModelChange,
    handleProcessRowUpdate,
  };
};
