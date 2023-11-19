import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { useUserDetail } from "@/components/usecase/useUserDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

// Zod スキーマ
const schema = z.object({
  userName: z.string().min(1, "入力必須です"),
  birthday: z.string().optional(),
  age: z.coerce
    .number()
    .nonnegative("数値は0以上である必要があります")
    .optional(),
  profile: z.string().optional(),
  gender: z.string(),
});

type FormData = z.infer<typeof schema>;

export const Detail = () => {
  // URLパラメータ取得
  const router = useRouter();
  const { userId } = router.query;

  // ユーザー詳細データ
  const {
    userData,
    hasError: hasUserDataError,
    isLoading: isUserDataLogind,
  } = useUserDetail((userId as string) || undefined);

  // 性別コード
  const {
    categoryCodeListData: genderList,
    hasError: hasCategoryError,
    isLoading: isCategoryLoding,
  } = useCategoryCode("gender");

  // フォーム定義
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      birthday: "",
      age: undefined,
      gender: "1",
      profile: "",
    },
  });

  // フォーム初期値設定
  useEffect(() => {
    if (!userData) return;
    const user = userData.data.user;
    setValue("userName", user.userName);
    setValue("birthday", user.birthday);
    setValue("age", user.age);
    setValue("gender", user.gender.toString());
    setValue("profile", user.profile);
  }, [userData]);

  // 更新ボタン押下アクション
  const onValid = (form: any) => {
    console.log("submit", form);
    alert("更新!");
  };

  const onInvalid = () => {
    console.log("Submit Invalid!");
  };

  if (hasUserDataError || hasCategoryError) return <div>failed to load</div>;
  if (isUserDataLogind || !userData || isCategoryLoding || !genderList)
    return <div>loading...</div>;
  return (
    <Box
      sx={{ marginTop: 2 }}
      component="form"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography>ユーザID</Typography>
        </Grid>
        <Grid item md={8}>
          <Typography>{userData.data.user.userId}</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography>パスワード</Typography>
        </Grid>
        <Grid item md={8}>
          <Typography>{userData.data.user.password}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>ユーザー名</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>誕生日</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="yyyy/MM/dd"
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>年齢</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>性別</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                {genderList.data.map((item) => (
                  <FormControlLabel
                    value={item.code}
                    key={item.code}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>部署名</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {userData.data.user.department?.departmentName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>プロフィール</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="profile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={3}
                error={!!errors.profile}
                helperText={errors.profile?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Button variant="contained" sx={{ marginRight: 1 }} type="submit">
              更新
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                alert("削除!");
              }}
            >
              削除
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
