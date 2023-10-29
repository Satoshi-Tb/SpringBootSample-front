import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useListSearchConditionMutators } from "@/components/store/useListSearchConditionState";

// Zod スキーマ
const schema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useConditionHook = () => {
  // 検索条件のセッター
  const { setListSearchCondition } = useListSearchConditionMutators();

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log(form);

    const conditions: { key: string; value: string }[] = [];
    if (form.userId) conditions.push({ key: "userId", value: form.userId });
    if (form.userName)
      conditions.push({ key: "userName", value: form.userName });

    const cond =
      conditions.length === 0
        ? ""
        : "?" + conditions.map((item) => `${item.key}=${item.value}`).join("&");

    console.log("submit.condition", cond);
    setListSearchCondition(cond);
  };

  /** フォーム定義 */
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return { handleSubmit, onValid, control };
};
