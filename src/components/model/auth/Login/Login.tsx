import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useLoginHooks } from "./LoginHooks";

export const Login = () => {
  const {
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    showPassword,
    handleClickShowPassword,
    handleSubmit,
    errors,
    submitting,
  } = useLoginHooks();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          ログイン
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="ユーザー名"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            error={Boolean(errors.username)}
            helperText={
              errors.username || "ユーザー名は4文字以上で入力してください"
            }
          />

          {/* MUI v6対応のパスワードフィールド */}
          <Box sx={{ position: "relative", width: "100%", mt: 2, mb: 1 }}>
            <TextField
              required
              fullWidth
              name="password"
              label="パスワード"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(errors.password)}
              helperText={
                errors.password ||
                "8文字以上、大文字・小文字・数字を各1文字以上含めてください"
              }
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={submitting}
          >
            {submitting ? "ログイン中..." : "ログイン"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
