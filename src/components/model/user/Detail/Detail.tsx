import { useUserDetail } from "@/components/usecase/useUserDetail";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const Detail = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { userData, hasError, isLoading } = useUserDetail(
    (userId as string) || undefined
  );
  if (hasError) return <div>failed to load</div>;
  if (isLoading || !userData) return <div>loading...</div>;
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
          <Typography>{userData.data.user.userName}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>誕生日</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{userData.data.user.birthday}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>年齢</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{userData.data.user.age}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>性別</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{userData.data.user.genderName}</Typography>
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
          <Typography>{userData.data.user.profile}</Typography>
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
