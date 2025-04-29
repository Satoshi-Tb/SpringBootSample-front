import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller } from "react-hook-form";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { FontSizeType } from "@/TypeDef";
import styled from "styled-components";
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useDetailHooks } from "./DetailHooks";

export const Detail = () => {
  const router = useRouter();

  const {
    handleSubmit,
    onValid,
    onInvalid,
    control,
    register,
    errors,
    userData,
    genderList,
    isDataLoading,
    hasFetchError,
    fontSize,
    pagingMode,
    nextUserId,
    beforeUserId,
    departments,
  } = useDetailHooks();

  if (hasFetchError) return <div>failed to load</div>;
  if (isDataLoading) return <div>loading...</div>;
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
          <Typography>{userData!.data.user.userId}</Typography>
        </Grid>
        <Grid item md={4}>
          <Typography>パスワード</Typography>
        </Grid>
        <Grid item md={8}>
          <Typography>{userData!.data.user.password}</Typography>
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
                {genderList!.data.map((item) => (
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
          <Controller
            name="department"
            control={control}
            render={({ field }) => {
              console.log("department", { field });
              return (
                <Stack direction="column" alignItems="left" width="150px">
                  <Select {...field} sx={{ width: "100%" }}>
                    <MenuItem value="">選択なし</MenuItem>
                    {departments.map((item, idx) => (
                      <MenuItem key={`${idx}-${item.value}`} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department?.message && (
                    <FormHelperText color="red">
                      {errors.department?.message}
                    </FormHelperText>
                  )}
                </Stack>
              );
            }}
          />
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
        <Grid item xs={4}>
          <Typography>トグルボタンサンプル</Typography>
        </Grid>
        <Grid item xs={8}>
          <SimpleToggleButton fontSize={fontSize} />
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
// スタイルドコンポーネントの定義
const StyledToggleButton = styled(ToggleButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .MuiTypography-root {
    font-size: ${(props) => {
      switch (props.size) {
        case "small":
          return "0.75em";
        case "medium":
          return "1em";
        case "large":
          return "1.25em";
        default:
          return "1em"; // デフォルトのフォントサイズ
      }
    }};
  }
`;

type SimpleToggleButtonProps = {
  fontSize: FontSizeType;
};
const SimpleToggleButton = ({ fontSize }: SimpleToggleButtonProps) => {
  const [alignment, setAlignment] = useState("left");
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={(_, newAlignment: any) => {
        if (newAlignment !== null) {
          // Prevent deselecting all options
          setAlignment(newAlignment);
        }
      }}
      aria-label="text alignment"
    >
      <StyledToggleButton
        value="left"
        aria-label="left aligned"
        size={fontSize}
      >
        <ContentPasteSearchIcon fontSize={fontSize} />
        <Typography variant="body2">外部評価</Typography>
      </StyledToggleButton>
      <StyledToggleButton value="center" aria-label="centered" size={fontSize}>
        <FactCheckSharpIcon fontSize={fontSize} />
        <Typography variant="body2" fontSize="1em">
          外部評価
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton
        value="right"
        aria-label="right aligned"
        size={fontSize}
      >
        <InventorySharpIcon fontSize={fontSize} />
        <Typography variant="body2" fontSize="1em">
          外部評価
        </Typography>
      </StyledToggleButton>
    </ToggleButtonGroup>
  );
};
