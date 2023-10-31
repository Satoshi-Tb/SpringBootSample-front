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

export const Signup = () => {
  const { categoryCodeListData, hasError, isLoading } =
    useCategoryCode("gender");

  if (hasError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Box
        component="form"
        onSubmit={() => {
          alert("submit!");
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        autoComplete="off"
      >
        <Typography variant="h4" className="text-center">
          ユーザー登録
        </Typography>

        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="ユーザーID"
            name="userId"
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="パスワード"
            name="password"
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="ユーザー名"
            name="userName"
          />
        </Box>

        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="誕生日"
            placeholder="yyyy/MM/dd"
            name="birthday"
          />
        </Box>

        <Box>
          <TextField fullWidth margin="normal" label="年齢" name="age" />
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
