import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod スキーマ
const schema = z.object({
  userId: z.string(),
  password: z.string(),
  userName: z
    .string()
    .min(1, "入力必須です")
    .refine((v) => v.length <= 50, { message: "50文字以内" })
    .refine((v) => !/[!\"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]/.test(v), {
      message: "記号を含めないでください",
    }),
  birthday: z.string().optional(),
  age: z.preprocess(
    (val) => (val ? Number(val) : null),
    z.number().nonnegative("数値は0以上である必要があります").nullable()
  ),
  profile: z.string().optional(),
  gender: z.string(),
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
  } = useForm<DetailFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: "",
      password: "",
      userName: "",
      birthday: "",
      age: undefined,
      gender: "1",
      profile: "",
    },
  });

  return { handleSubmit, control, errors, register, setValue };
};
