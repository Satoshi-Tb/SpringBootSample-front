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

export const Signup = () => {
  /** フォーム定義 */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 検索ボタン押下アクション
  const onValid = (form: FormData) => {
    console.log("submit", form);
  };

  const onInvalid = () => {
    console.log("Submit Invalid!");
  };

  const { categoryCodeListData, hasError, isLoading } =
    useCategoryCode("gender");

  if (hasError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
              <TextField margin="normal" label="ユーザー名" {...field} />
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
              <TextField fullWidth margin="normal" label="年齢" {...field} />
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
