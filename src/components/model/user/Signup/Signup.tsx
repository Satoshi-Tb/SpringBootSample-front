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
import { Controller } from "react-hook-form";
import { useSignup } from "./SignupHooks";

export const Signup = () => {
  const {
    genderList,
    departmentList,
    handleSubmit,
    handleTextAreaChange,
    enableAge,
    onValid,
    onInvalid,
    control,
    errors,
  } = useSignup();

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
              <TextField {...field} margin="normal" label="ユーザー名" />
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
                onChange={(e) => {
                  // react-hook-formの内部状態の更新を確実に行うためコール。
                  field.onChange(e);
                  handleTextAreaChange();
                }}
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
                disabled={enableAge}
                {...field}
              />
            )}
          />
        </Box>

        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">性別</FormLabel>
            <RadioGroup row name="gender">
              {genderList.map((item) => (
                <FormControlLabel
                  value={item.code}
                  key={item.code}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
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
              {departmentList.map((item) => (
                <MenuItem value={item.departmentId} key={item.departmentId}>
                  {item.departmentName}
                </MenuItem>
              ))}
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
