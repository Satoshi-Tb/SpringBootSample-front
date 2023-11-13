import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useListSearchConditionMutators } from "@/components/store/useListSearchConditionState";
import {
  useListPageOffsetState,
  useListRowsPerPageState,
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
  const userListPageOffset = useListPageOffsetState();
  const userListRowsPerPage = useListRowsPerPageState();

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log(form);

    const conditions: { key: string; value: string }[] = [];
    if (form.userId) conditions.push({ key: "userId", value: form.userId });
    if (form.userName)
      conditions.push({ key: "userName", value: form.userName });
    conditions.push({ key: "page", value: userListPageOffset.toString() });
    conditions.push({ key: "size", value: userListRowsPerPage.toString() });

    const cond =
      conditions.length === 0
        ? ""
        : "?" + conditions.map((item) => `${item.key}=${item.value}`).join("&");

    console.log("submit.condition", cond);
    setListSearchCondition(cond);
  };

  // 初期検索条件の構築。これが必要なはず
  useEffect(() => {
    const conditions: { key: string; value: string }[] = [];
    conditions.push({ key: "page", value: userListPageOffset.toString() });
    conditions.push({ key: "size", value: userListRowsPerPage.toString() });

    const cond =
      conditions.length === 0
        ? ""
        : "?" + conditions.map((item) => `${item.key}=${item.value}`).join("&");

    console.log("submit.condition", cond);
    setListSearchCondition(cond);
  }, []);

  /** フォーム定義 */
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return { handleSubmit, onValid, control };
};
