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

  const buildParam = (form: { userId?: string; userName?: string }) => {
    const conditions: { key: string; value: string }[] = [];
    if (form?.userId) conditions.push({ key: "userId", value: form.userId });
    if (form?.userName)
      conditions.push({ key: "userName", value: form.userName });
    conditions.push({ key: "page", value: userListPageOffset.toString() });
    conditions.push({ key: "size", value: userListRowsPerPage.toString() });

    return conditions.length === 0
      ? ""
      : "?" + conditions.map((item) => `${item.key}=${item.value}`).join("&");
  };

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log(form);
    const cond = buildParam(form);

    console.log("submit condition", cond);
    setListSearchCondition(cond);
  };

  /** フォーム定義 */
  const { handleSubmit, control, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 初期検索条件の構築。これが必要なはず
  useEffect(() => {
    const cond = buildParam({
      userId: getValues("userId"),
      userName: getValues("userName"),
    });
    console.log("condition init", cond);
    setListSearchCondition(cond);
  }, [buildParam, setListSearchCondition]);

  return { handleSubmit, onValid, control };
};
