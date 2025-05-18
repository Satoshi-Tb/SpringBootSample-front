import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import { Eye, EyeOff } from "lucide-react";
import { useDetailHooks } from "./DetailHooks";
import { calculateAge } from "@/utils/utility";
import dayjs, { Dayjs } from "dayjs";

export type UserEditeModeType = "create" | "update";

type Props = {
  editMode: UserEditeModeType;
};

export const Detail = ({ editMode }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    onValid,
    onInvalid,
    control,
    errors,
    user,
    genderList,
    isDataLoading,
    hasFetchError,
    fontSize,
    pagingMode,
    nextUserId,
    beforeUserId,
    departmentList,
    watchBirthday,
    updateButtonEnabled,
    handleChangeDivision,
    showPassword,
    handleClickShowPassword,
  } = useDetailHooks({ editMode });

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
          <Typography>
            ユーザID<span style={{ color: "red" }}>*</span>
          </Typography>
        </Grid>
        <Grid item md={8}>
          {editMode === "create" ? (
            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.userId}
                  helperText={errors.userId?.message}
                />
              )}
            />
          ) : (
            <Typography>{user?.userId}</Typography>
          )}
        </Grid>
        <Grid item md={4}>
          <Typography>
            パスワード<span style={{ color: "red" }}>*</span>
          </Typography>
        </Grid>
        <Grid item md={8}>
          {editMode === "create" ? (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Box sx={{ position: "relative", width: "100%", mt: 2, mb: 1 }}>
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label=""
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ "& .MuiInputBase-root": { pr: 7 } }} // アイコンボタン用のスペースを確保
                  />
                  <IconButton
                    aria-label="パスワードの表示切り替え"
                    onClick={handleClickShowPassword}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: "text.secondary",
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </IconButton>
                </Box>
              )}
            />
          ) : (
            <Typography>{user?.password}</Typography>
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography>
            ユーザー名<span style={{ color: "red" }}>*</span>
          </Typography>
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
          <Typography>
            誕生日<span style={{ color: "red" }}>*</span>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl error={!!errors.birthday} fullWidth>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  inputFormat="YYYY/MM/DD"
                  onChange={(value: Dayjs | null) => {
                    console.log("誕生日フィールド変更", { value });
                    field.onChange(value ? value.toDate() : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={errors.birthday?.message as string}
                      fullWidth
                      error={!!errors.birthday}
                    />
                  )}
                  disableFuture
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography>年齢</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{calculateAge(watchBirthday)} 歳</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            性別<span style={{ color: "red" }}>*</span>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup {...field} row>
                  {genderList.map((item) => (
                    <FormControlLabel
                      value={item.code}
                      key={item.code}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
                {errors.gender?.message && (
                  <FormHelperText sx={{ color: "red", ml: 1 }}>
                    {errors.gender?.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            部署名<span style={{ color: "red" }}>*</span>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Stack direction="column" alignItems="left" width="150px">
                <Select
                  {...field}
                  onChange={(event: SelectChangeEvent<string>) => {
                    field.onChange(event);
                    handleChangeDivision(event);
                  }}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="">選択なし</MenuItem>
                  {departmentList.map((item, idx) => (
                    <MenuItem
                      key={`${idx}-${item.departmentId}`}
                      value={item.departmentId}
                    >
                      {item.departmentName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.department?.message && (
                  <FormHelperText sx={{ color: "red", ml: 1 }}>
                    {errors.department?.message}
                  </FormHelperText>
                )}
              </Stack>
            )}
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
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap={5}
          >
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              type="submit"
              disabled={!updateButtonEnabled}
            >
              {editMode === "create" ? "登録" : "更新"}
            </Button>
            {editMode === "update" ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  alert("削除!");
                }}
              >
                削除
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  router.push("/");
                }}
              >
                キャンセル
              </Button>
            )}
            {editMode === "update" && (
              <>
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
              </>
            )}
          </Box>
        </Grid>
      </Grid>
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
