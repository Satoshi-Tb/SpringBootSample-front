import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useListSearchConditionMutators } from "@/components/store/useListSearchConditionState";
import {
  useUserListSelectedPage,
  useUserListPageSizeState,
} from "@/components/store/useUserListPaginationState";
import { useEffect } from "react";

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

  // 初期検索条件の構築。これが必要なはず
  useEffect(() => {
    setListSearchCondition({
      userId: getValues("userId"),
      userName: getValues("userName"),
      page: userListPageOffset,
      size: userListRowsPerPage,
    });
  }, [getValues, userListPageOffset, userListRowsPerPage]);

  return { handleSubmit, onValid, control };
};
