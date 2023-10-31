import { useState } from "react";
import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod スキーマ
const schema = z.object({
  userId: z.string().min(1, "入力必須です"),
  password: z.string().min(1, "入力必須です"),
  userName: z.string().min(1, "入力必須です"),
  birthday: z.string().optional(),
  age: z.number().optional(),
});

type FormData = z.infer<typeof schema>;

// watch関数とgetValues関数メリット/デメリット

// watch関数
// [メリット]
// リアルタイムの監視：
//  watchはリアルタイムでフォームフィールドの値の変更を監視します。
//  これにより、ユーザーがフォームのフィールドに入力をするたびに、その変更を即座に捉えることができます。

// 柔軟性：
//  特定のフィールドだけを監視するか、またはすべてのフィールドを監視するかを選択することができます。

// [デメリット]
// 再レンダリングの頻度：
//  監視対象のフィールドの値が変更されるたびに再レンダリングがトリガーされます。
//  これはパフォーマンスに影響を及ぼす可能性があります、特に大きなフォームや高頻度の更新が行われるフォームでの使用には注意が必要です。

// getValues関数
// [メリット]
// 再レンダリングの抑制：
//   getValues関数を使用して値を取得することで、再レンダリングをトリガーすることなく、現在のフォームの値を取得できます。

// 瞬時の値取得：
//   任意のタイミングでフォームの値を取得する際に適しています。

// [デメリット]
// リアルタイムではない：
//   getValuesはリアルタイムでの値の変更を監視するものではありません。そのため、特定のイベントやアクションが発生した時に明示的に呼び出す必要があります。

// コードの冗長性：
//   リアルタイムの変更を捉えたい場合、イベントハンドラやuseEffectなどと組み合わせて使用することで実現する必要があり、コードがやや冗長になる可能性があります。

// まとめ：
// どちらの関数を使用するかは、具体的な使用ケースや要件によって異なります。リアルタイムの変更を捉えたい場合やコードのシンプルさを重視する場合はwatchが適しています。
// 一方、不要な再レンダリングを避けたい場合や、特定のイベントに基づいてフォームの値を取得する場合はgetValuesが適しています。
export const Signup = () => {
  const [enableAge, setEnableAge] = useState(false);

  /** フォーム定義 */
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // パスワードフィールドの入力監視
  // 未入力の場合、誕生日フィールドを非活性(watchによる実装)
  const watchUserId = watch("userId", "");

  // ユーザー名フィールド取得
  // 未入力の場合、年齢フィールドを非活性(getValuesによる実装)
  const handleTextAreaAChange = () => {
    const valueA = getValues("userName");
    setEnableAge(!!valueA);
  };

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log("submit", form);
  };

  const onInvalid = () => {
    console.log("Submit Invalid!");
  };

  const { categoryCodeListData, hasError, isLoading } =
    useCategoryCode("gender");

  // if (hasError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onValid, onInvalid)}
        display="flex"
        flexDirection="column"
        alignItems="center"
        autoComplete="off"
      >
        <Typography variant="h4" className="text-center">
          ユーザー登録
        </Typography>

        <Box>
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField margin="normal" label="ユーザーID" {...field} />
            )}
          />
          {errors.userId?.message && <p>{errors.userId.message}</p>}
        </Box>

        <Box>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField margin="normal" label="パスワード" {...field} />
            )}
          />
          {errors.password?.message && <p>{errors.password.message}</p>}
        </Box>

        <Box>
          <Controller
            name="userName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="ユーザー名"
                onChange={(e) => {
                  // react-hook-formの内部状態の更新を確実に行うためコール。
                  field.onChange(e);
                  handleTextAreaAChange();
                }}
              />
            )}
          />
          {errors.userName?.message && <p>{errors.userName.message}</p>}
        </Box>

        <Box>
          <Controller
            name="birthday"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                label="誕生日"
                placeholder="yyyy/MM/dd"
                disabled={!watchUserId}
                {...field}
              />
            )}
          />
          {errors.birthday?.message && <p>{errors.birthday.message}</p>}
        </Box>

        <Box>
          <Controller
            name="age"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <TextField
                fullWidth
                margin="normal"
                label="年齢"
                disabled={!enableAge}
                {...field}
              />
            )}
          />
        </Box>

        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">性別</FormLabel>
            <RadioGroup row name="gender">
              <FormControlLabel value="1" control={<Radio />} label="男性" />
              <FormControlLabel value="2" control={<Radio />} label="女性" />
              <FormControlLabel value="3" control={<Radio />} label="その他" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <FormControl fullWidth>
            <InputLabel id="department-label">部署</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              sx={{ width: "200px" }}
            >
              <MenuItem value="1">システム管理部</MenuItem>
              <MenuItem value="2">営業部</MenuItem>
              <MenuItem value="3">SI事業部</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-3"
          >
            ユーザー登録
          </Button>
        </Box>
      </Box>
    </>
  );
};
