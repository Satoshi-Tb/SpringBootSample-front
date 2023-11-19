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

export const Detail = () => {
  const router = useRouter();
  const { userId } = router.query;

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

  if (hasUserDataError || hasCategoryError) return <div>failed to load</div>;
  if (isUserDataLogind || !userData || isCategoryLoding || !genderList)
    return <div>loading...</div>;
  return (
    <Box sx={{ marginTop: 2 }}>
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
          <TextField fullWidth value={userData.data.user.userName}></TextField>
        </Grid>
        <Grid item xs={4}>
          <Typography>誕生日</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField value={userData.data.user.birthday}></TextField>
        </Grid>
        <Grid item xs={4}>
          <Typography>年齢</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField value={userData.data.user.age}></TextField>
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
                  checked={userData.data.user.gender?.toString() === item.code}
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
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => {
                alert("更新!");
              }}
            >
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
