import { useEffect, useState } from "react";
import { UserType, useUserListPost } from "@/components/usecase/useUserList";
import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import {
  GridColDef,
  GridPaginationModel,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  useUserListSelectedPageMutators,
  useUserListPageSizeMutators,
} from "@/components/store/useUserListPaginationState";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useUpdateUser } from "@/components/usecase/useUserMutator";
import envConfig from "@/utils/envConfig";
import {
  useUserListSelectedRowIds,
  useUserListSelectedRowIdsMutator,
} from "@/components/store/useUserListRowSelectionState";
import { Link } from "@mui/material";
import HighlightKeywords from "@/components/ui/highlight";
import { useHighlightSettingsState } from "@/components/store/useHighlightSettingsState";
import { useRealTimeUpdateState } from "@/components/store/useRealTimeUpdateState";

export const useListHook = () => {
  // 画面データ
  const [rowData, setRowData] = useState<UserType[]>([]);
  // 検索データ件数
  const [rowCount, setRowCount] = useState<number>(0);
  // 選択ページ
  const { setUserListSelectedPage } = useUserListSelectedPageMutators();
  // ページサイズ
  const { setUserListPageSize } = useUserListPageSizeMutators();
  // 選択行IDリスト
  const { setUserListSelectedRowIds } = useUserListSelectedRowIdsMutator();
  const selectedRowIds = useUserListSelectedRowIds();
  // ハイライト設定
  const highlightSettings = useHighlightSettingsState();

  const realTimeUpdate = useRealTimeUpdateState();

  // 検索条件
  const condition = useListSearchConditionState();
  const { setListSearchCondition } = useListSearchConditionMutators();

  //再読込
  const { mutate } = useSWRMutator();
  // データ取得処理
  //const { userListData, hasError, isLoading } = useUserList(condition);
  const { userListData, hasError, isLoading } = useUserListPost(condition);
  // 更新処理
  const { trigger: updateUser, error, data } = useUpdateUser();

  // グリッドのカラム定義
  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "ユーザーID",
      width: 150,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Link href={`/user/detail/${params.row.userId}?pagingMode=allRows`}>
          {params.row.userId}
        </Link>
      ),
    },
    {
      field: "userName",
      headerName: "ユーザー名",
      width: 150,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length === 0;
        return { ...params.props, error: hasError };
      },
      renderCell: (params) => {
        return (
          <HighlightKeywords text={params.value} settings={highlightSettings} />
        );
      },
    },
    { field: "updUserId", headerName: "更新者", width: 150 },
    {
      field: "updDate",
      headerName: "更新日",
      width: 180,
      type: "dateTime",
      valueGetter: (params) => {
        return params.value ? new Date(params.value) : null;
      },
    },
    {
      field: "birthday",
      headerName: "誕生日",
      width: 130,
      type: "date",
      valueGetter: (params) => {
        return params.value ? new Date(params.value) : null;
      },
    },
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
    {
      field: "detail",
      headerName: "",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: 16 }}
          href={`/user/detail/${params.row.userId}`}
        >
          詳細
        </Button>
      ),
    },
  ];

  // ページサイズ／ページチェンジイベント
  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    setUserListSelectedPage(newPaginationModel.page);
    setUserListPageSize(newPaginationModel.pageSize);
    setListSearchCondition({
      ...condition,
      page: newPaginationModel.page,
      size: newPaginationModel.pageSize,
    });
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
        age: newRow.age ?? null,
        gender: newRow.gender,
        updateMode: "replace",
      });
      console.log("更新結果", result);
      console.log("更新データ", data);

      // 更新後データ再読込
      console.log("condition", condition);

      if (realTimeUpdate) {
        //const key = `${envConfig.apiUrl}/api/user/get/list-pager${condition}`; // GET版の場合のkey指定
        const key = [`${envConfig.apiUrl}/api/user/get/list-pager`, condition]; // POST版の場合のkey指定
        mutate(key);
      }

      // DB更新が成功した場合、新しい行データを返してグリッドにコミットする
      return newRow;
    } catch (e) {
      console.log(e);
      // DB更新に失敗した場合は、変更を破棄する
      return oldRow;
    }
  };

  const handleRowSelectionModel = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    console.log("selectedRowIds:", newSelectionModel);
    setUserListSelectedRowIds(newSelectionModel);
    // 選択行データを取得。
    // この方法はサーバーページネーションの場合、正しく動作しない
    // サーバーページネーションの場合、rowDataは1ページ分しか保持していない。
    // データ追跡する場合、rowidを条件にバックエンドからデータ取得する必要がある
    const selectedRows = rowData.filter((row) =>
      newSelectionModel.includes(row.userId)
    );

    console.log("selectedRows:", selectedRows);
  };

  // Excelダウンロード
  const handleExcelDownload = () => {
    console.log("Excelダウンロードボタン押下", { selectedRowIds });
  };

  useEffect(() => {
    if (hasError || !userListData || !userListData.data.userList) return;
    setRowData(userListData.data.userList);
    setRowCount(userListData.data.resultNum);
  }, [hasError, userListData]);

  return {
    rowData,
    rowCount,
    hasError,
    isLoading,
    columns,
    handlePaginationModelChange,
    handleProcessRowUpdate,
    handleRowSelectionModel,
    handleExcelDownload,
    selectedRowIds,
  };
};
