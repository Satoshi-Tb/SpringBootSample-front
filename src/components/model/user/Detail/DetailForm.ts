import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createInvalidSymbolRegex = (
  opt: string | undefined = undefined
) => {
  return new RegExp(/[!\"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]/, opt);
};

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
    .refine((v) => v.length <= 50, { message: "50文字以内" })
    .refine((v) => !createInvalidSymbolRegex().test(v), {
      message: "記号を含めないでください",
    }),
  birthday: z.date({
    required_error: "入力必須です",
    invalid_type_error: "有効な日付を入力してください",
  }),
  age: z.preprocess(
    (val) => (val ? Number(val) : null),
    z.number().nonnegative("0以上の数値を指定してください").nullable()
  ),
  department: z.string().min(1, "選択必須です"), // 選択リストの型。valueに対する設定のため、string型になる
  profile: z.string(),
  gender: z.string().refine((v) => v !== "", { message: "選択必須です" }),
  department2: z.number().min(1, "選択必須です"), // オブジェクト形式で持つテスト
});

export type DetailFormData = z.infer<typeof schema>;

export const useDetailForm = () => {
  // フォーム定義
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
    reset,
    watch,
  } = useForm<DetailFormData>({
    mode: "onSubmit", // submit時にバリデーションを行う
    reValidateMode: "onChange", // 入力時に再バリデーションを行う
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      password: "",
      userName: "",
      birthday: undefined,
      age: undefined,
      department: "",
      gender: "",
      profile: "",
      department2: undefined,
    },
  });

  return { handleSubmit, control, errors, register, setValue, reset, watch };
};
