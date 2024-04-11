import { useCategoryCode } from "@/components/usecase/useCategoryCodeList";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useUserDetail } from "@/components/usecase/useUserDetail";
import { useUpdateUser } from "@/components/usecase/useUserMutator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";
import { PagingModeType } from "@/TypeDef";
import envConfig from "@/utils/envConfig";

// Zod スキーマ
const schema = z.object({
  userId: z.string(),
  password: z.string(),
  userName: z
    .string()
    .min(1, "入力必須です")
    .refine((v) => v.length <= 50, { message: "50文字以内" })
    .refine((v) => !/[!-\/:-@\[-`{-~]/.test(v), {
      message: "記号・半角スペースを含めないでください",
    }),
  birthday: z.string().optional(),
  age: z.preprocess(
    (val) => (val ? Number(val) : null),
    z.number().nonnegative("数値は0以上である必要があります").nullable()
  ),
  profile: z.string().optional(),
  gender: z.string(),
});

type FormData = z.infer<typeof schema>;

const replaceSymbols = (input: string) => {
  // 正規表現を使用して_以外の半角記号、半角スペースを''に置換
  // _のASCIIコードは5F

  // \x21-\x2F : ! から / まで
  // \x3A-\x40 : : から @ まで
  // \x5B-\x5E : [ から ^ まで
  // \x5F      : _
  // \x60      : `
  // \x7B-\x7E : { から ~ まで
  return input.replace(/[ \x21-\x2F\x3A-\x40\x5B-\x5E\x60\x7B-\x7E]/g, "");
};

export const Detail = () => {
  // 前のユーザーID
  const [beforeUserId, setBeforeUseId] = useState<string | undefined>(
    undefined
  );
  // 次のユーザーID
  const [nextUserId, setNextUseId] = useState<string | undefined>(undefined);

  // URLパラメータ取得
  const router = useRouter();
  const { userId, pagingMode } = router.query;

  // 選択IDリスト
  const selectedRowIds = useUserListSelectedRowIds();

  // ユーザー詳細データ取得
  const {
    userData,
    hasError: hasUserDataError,
    isLoading: isUserDataLogind,
  } = useUserDetail((userId as string) || undefined);

  // 更新処理
  const { trigger: updateUser, error, data } = useUpdateUser();

  //再読込
  const { mutate } = useSWRMutator();

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
    register,
  } = useForm<FormData>({
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

  // フォーム初期値設定
  useEffect(() => {
    if (!userData) return;
    const mode = pagingMode as PagingModeType;
    const user = userData.data.user;
    setValue("userId", user.userId);
    setValue("password", user.password);
    setValue("userName", user.userName);
    setValue("birthday", user.birthday);
    setValue("age", user.age ?? null);
    setValue("gender", user.gender.toString());
    setValue("profile", user.profile);

    // const idx = selectedRowIds.findIndex((val) => {
    //   console.log("val vs userId", val, user.userId);
    //   return val === user.userId;
    // });
    // TODO 課題：ページ切替で選択行状態が解除されるため、うまく前後IDをとれない
    const idx = selectedRowIds.indexOf(user.userId);
    console.log("useEffect@selectedRowIds", selectedRowIds);
    console.log("useEffect@userId", user.userId);
    console.log("useEffect@idx", idx);

    setBeforeUseId(
      mode === "allRows"
        ? userData.data.beforeUserId
        : idx !== -1 && idx > 0
        ? (selectedRowIds[idx - 1] as string)
        : undefined
    );
    setNextUseId(
      mode === "allRows"
        ? userData.data.nextUserId
        : idx !== -1 && idx + 1 < selectedRowIds.length
        ? (selectedRowIds[idx + 1] as string)
        : undefined
    );
  }, [userData, selectedRowIds, pagingMode]);
  console.log("Detail beforeUserId", beforeUserId);
  console.log("Detail nextUserId", nextUserId);
  console.log("Detail selectedRowIds", selectedRowIds);

  // 更新ボタン押下アクション
  const onValid = async (form: FormData) => {
    console.log("submit", form);
    try {
      const replacedProfile = replaceSymbols(form.profile ?? "");
      console.log("submit replace", replacedProfile);
      const result = await updateUser({
        id: form.userId,
        userId: form.userId,
        userName: form.userName,
        password: form.password,
        age: form.age,
        gender: parseInt(form.gender),
        profile: replacedProfile,
        updateMode: "replace",
      });
      console.log("更新結果", result);

      // 更新後データ再読込
      const key = `${envConfig.apiUrl}/api/user/detail/${form.userId}`;
      mutate(key);
      alert("更新!");
    } catch (e) {
      console.log(e);
      alert("エラー!");
    }
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
            <IconButton
              onClick={() => {
                router.push(
                  `/user/detail/${beforeUserId}?pagingMode=${pagingMode}`
                );
              }}
              disabled={!beforeUserId}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                router.push(
                  `/user/detail/${nextUserId}?pagingMode=${pagingMode}`
                );
              }}
              disabled={!nextUserId}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("password")} />
    </Box>
  );
};
