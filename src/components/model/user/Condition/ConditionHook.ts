import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import {
  useUserListSelectedPage,
  useUserListPageSizeState,
} from "@/components/store/useUserListPaginationState";
import { useEffect } from "react";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";
import { useDeleteUser } from "@/components/usecase/useUserMutator";
import envConfig from "@/utils/envConfig";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";

// Zod スキーマ
const schema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useConditionHook = () => {
  // 検索条件のセッター
  const { setListSearchCondition } = useListSearchConditionMutators();
  const userListPageOffset = useUserListSelectedPage();
  const userListRowsPerPage = useUserListPageSizeState();
  const selectedRowIds = useUserListSelectedRowIds();

  // 一括削除処理
  const { trigger: deleteUser, error: deleteError } = useDeleteUser();
  // 検索条件
  const condition = useListSearchConditionState();
  //再読込
  const { mutate } = useSWRMutator();

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log("form", form);
    setListSearchCondition({
      userId: form.userId,
      userName: form.userName,
      page: userListPageOffset,
      size: userListRowsPerPage,
    });
  };

  /** フォーム定義 */
  const { handleSubmit, control, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  // 初期検索条件の構築。これが必要なはず
  useEffect(() => {
    setListSearchCondition({
      userId: getValues("userId"),
      userName: getValues("userName"),
      page: userListPageOffset,
      size: userListRowsPerPage,
    });
  }, [getValues, userListPageOffset, userListRowsPerPage]);

  return { handleSubmit, onValid, control, handleBulkDelete, deleteError };
};
