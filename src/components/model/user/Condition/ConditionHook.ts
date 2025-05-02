import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import {
  useUserListSelectedPage,
  useUserListPageSizeState,
} from "@/components/store/useUserListPaginationState";
import { useMemo } from "react";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";
import { useDeleteUser } from "@/components/usecase/useUserMutator";
import envConfig from "@/utils/envConfig";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useRouter } from "next/router";
import { downloadExcel } from "@/utils/downloadExcel";
import { getBigDataExcel } from "@/components/repository/getBigDataExcel";
import {
  useRealTimeUpdateMutators,
  useRealTimeUpdateState,
} from "@/components/store/useRealTimeUpdateState";
import { useUserListExcel } from "@/components/usecase/useUserList";

export const useConditionHook = () => {
  // 検索条件のセッター
  const { setListSearchCondition } = useListSearchConditionMutators();
  const userListPageOffset = useUserListSelectedPage();
  const userListRowsPerPage = useUserListPageSizeState();
  const selectedRowIds = useUserListSelectedRowIds();
  const showDetailButtonEnabled = selectedRowIds.length === 0;
  const bulkDeleteButtonEnabled = selectedRowIds.length >= 1;

  const { trigger: getExcel } = useUserListExcel();

  const realTimeUpdate = useRealTimeUpdateState();
  const { setRealTimeUpdate } = useRealTimeUpdateMutators();

  // URLパラメータ取得
  const router = useRouter();

  // 一括削除処理
  const { trigger: deleteUser, error: deleteError } = useDeleteUser();
  // 検索条件
  const condition = useListSearchConditionState();
  //再読込
  const { mutate } = useSWRMutator();
  // 検索中かどうか
  const searchActivated = useMemo(() => {
    return (
      condition.ageFrom ||
      condition.ageTo ||
      condition.departmentId ||
      condition.gender ||
      condition.userId ||
      condition.userName
    );
  }, [condition]);

  // 検索条件クリア
  const clearSearchCondition = () =>
    setListSearchCondition({
      userId: "",
      userName: "",
      departmentId: "",
      gender: "",
      ageFrom: undefined,
      ageTo: undefined,
      page: userListPageOffset,
      size: userListRowsPerPage,
    });

  // 一括削除押下
  const handleBulkDelete = async () => {
    console.log("Condition>handleBulkDelete: selectedRowIds", selectedRowIds);
    try {
      const userIds = selectedRowIds.map((id) => id.toString());
      await deleteUser({ userIdList: userIds });

      // 更新後データ再読込
      const key = [`${envConfig.apiUrl}/api/user/get/list-pager`, condition]; // POST版の場合のkey指定
      mutate(key);
    } catch (e) {
      console.log("handleBulkDelete err:", e);
    }
  };

  // 詳細ボタン押下
  const handleOnClickDetail = () => {
    router.push(`/user/detail/${selectedRowIds[0]}?pagingMode=selectedRows`);
  };

  // Excel DLボタン
  const handleExcelDownload = async () => {
    // const excelData = await getUserListExcel();
    // downloadExcel(excelData, "userlist-sample.xlsx");
    try {
      const excelData = await getExcel(condition);
      downloadExcel(excelData, "userlist-sample.xlsx");
    } catch (e) {
      console.log("handleExcelDownload err:", e);
    }
  };

  // Excel DLボタン
  const handleBigExcelDownload = async () => {
    console.log(
      new Date().toLocaleString() + " Excelダウンロードボタン押下開始"
    );
    console.log(new Date().toLocaleString() + " Excelデータ取得開始");
    const excelData = await getBigDataExcel();
    console.log(new Date().toLocaleString() + " Excelデータ取得完了");

    downloadExcel(excelData, "bigdata-sample.xlsx");
    console.log(
      new Date().toLocaleString() + " Excelダウンロードボタン押下完了"
    );
  };

  return {
    showDetailButtonEnabled,
    handleBulkDelete,
    handleOnClickDetail,
    handleExcelDownload,
    handleBigExcelDownload,
    deleteError,
    realTimeUpdate,
    setRealTimeUpdate,
    bulkDeleteButtonEnabled,
    searchActivated,
    clearSearchCondition,
  };
};
