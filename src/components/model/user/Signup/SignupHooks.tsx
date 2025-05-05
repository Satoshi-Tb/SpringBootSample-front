import { useMemo, useState } from "react";
import {
  CodeType,
  useCategoryCode,
} from "@/components/usecase/useCategoryCodeList";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DepartmentType,
  useDepartmentList,
} from "@/components/usecase/useDepartmentList";
import { useForm } from "react-hook-form";

// Zod スキーマ
const schema = z.object({
  userId: z.string().min(4, "ユーザー名は4文字以上である必要があります"),
  password: z
    .string()
    .min(6, "パスワードは6文字以上である必要があります")
    .regex(/[A-Z]/, "大文字の英字を1文字以上含める必要があります")
    .regex(/[a-z]/, "小文字の英字を1文字以上含める必要があります")
    .regex(/[0-9]/, "数字を1文字以上含める必要があります"),
  userName: z
    .string()
    .min(1, "入力必須です")
    .max(50, "50文字以内にしてください"),
  birthday: z.string().optional(),
  department: z.string().min(1, "選択必須です"),
  profile: z.string().optional(),
  gender: z.string().refine((v) => v !== "", { message: "選択必須です" }),
});

type FormData = z.infer<typeof schema>;

export const useSignup = () => {
  const [enableAge, setEnableAge] = useState(false);

  /** フォーム定義 */
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ユーザー名フィールド取得
  // 未入力の場合、年齢フィールドを非活性(getValuesによる実装)
  const handleTextAreaChange = () => {
    const valueA = getValues("birthday");
    setEnableAge(!!valueA);
  };

  // サブミット成功
  const onValid = (form: FormData) => {
    console.log("submit", form);
  };

  // サブミットエラー
  const onInvalid = () => {
    console.log("Submit Invalid!");
  };

  // 性別コード
  const { categoryCodeListData, isLoading: isCategoryLoding } =
    useCategoryCode("gender");
  const genderList = useMemo<CodeType[]>(() => {
    return (
      categoryCodeListData?.data.map((item) => ({
        category: item.category,
        code: item.code,
        name: item.name,
      })) ?? []
    );
  }, [categoryCodeListData]);

  // 部署コード
  const { departmentListData, isLoading: isDepartmentLoding } =
    useDepartmentList();
  const departmentList = useMemo<DepartmentType[]>(() => {
    return (
      departmentListData?.data.map((item) => ({
        departmentId: item.departmentId,
        departmentName: item.departmentName,
      })) ?? []
    );
  }, [departmentListData]);

  return {
    genderList,
    departmentList,
    handleSubmit,
    handleTextAreaChange,
    enableAge,
    onValid,
    onInvalid,
    control,
    errors,
  };
};
