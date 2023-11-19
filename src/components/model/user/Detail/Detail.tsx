import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { useUserDetail } from "@/components/usecase/useUserDetail";
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

type FormData = {
  userName: string | undefined;
  birthday: string | undefined;
  age: number | undefined;
  profile: string | undefined;
  gender: string;
};

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
    const user = userData?.data.user;
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={userData.data.user.userName}
              />
            )}
          />
          {errors.userName?.message && <p>{errors.userName.message}</p>}
        </Grid>
        <Grid item xs={4}>
          <Typography>誕生日</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="birthday"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} placeholder="yyyy/MM/dd" />
            )}
          />
          {errors.birthday?.message && <p>{errors.birthday.message}</p>}
        </Grid>
        <Grid item xs={4}>
          <Typography>年齢</Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="age"
            control={control}
            defaultValue={undefined}
            render={({ field }) => <TextField {...field} />}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>性別</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <RadioGroup aria-labelledby="gender-group" row name="gender">
              {genderList?.data.map((item) => (
                <FormControlLabel
                  value={item.code}
                  key={item.code}
                  control={<Radio />}
                  label={item.name}
                  checked={userData.data.user.gender.toString() === item.code}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
          <TextField
            fullWidth
            multiline
            value={userData.data.user.profile}
            rows={3}
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
