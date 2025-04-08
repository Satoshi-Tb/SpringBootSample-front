import React, { ChangeEvent, FormEvent, useState } from "react";
import { SimpleLayout } from "../../layout";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { z, ZodError } from "zod";
import { Eye, EyeOff } from "lucide-react";
import envConfig from "@/utils/envConfig";
import { useRouter } from "next/navigation";

// バリデーションスキーマの定義
const loginSchema = z.object({
  username: z.string().min(4, "ユーザー名は4文字以上である必要があります"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上である必要があります")
    .regex(/[A-Z]/, "大文字の英字を1文字以上含める必要があります")
    .regex(/[a-z]/, "小文字の英字を1文字以上含める必要があります")
    .regex(/[0-9]/, "数字を1文字以上含める必要があります"),
});

// スキーマから型を生成
type LoginFormData = z.infer<typeof loginSchema>;

// エラー型の定義
type FormErrors = {
  [K in keyof LoginFormData]?: string;
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  // フィールドのバリデーションを行う関数
  const validateField = (field: keyof LoginFormData, value: string): void => {
    try {
      const fieldSchema = { [field]: loginSchema.shape[field] };
      z.object(fieldSchema).parse({ [field]: value });
      // バリデーション成功したらエラーを削除
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      // Zodエラーメッセージを設定
      if (error instanceof ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === field);
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        }
      }
    }
  };

  // ユーザー名の変更ハンドラ
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUsername(value);
    if (value) validateField("username", value);
  };

  // パスワードの変更ハンドラ
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);
    if (value) validateField("password", value);
  };

  // パスワード表示切り替えハンドラ
  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  // フォーム送信ハンドラ
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // フォーム全体のバリデーション
      const validatedData = loginSchema.parse({ username, password });
      console.log("ログイン情報:", validatedData);
      // ここに実際の認証処理を追加します
      router.push("/user/list");
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

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
              errors.username || "ユーザー名は8文字以上で入力してください"
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
