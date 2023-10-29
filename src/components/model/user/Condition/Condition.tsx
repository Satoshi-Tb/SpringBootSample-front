import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useConditionHook } from "./ConditionHook";

export const Condition = () => {
  // フォーム定義、アクション
  const { handleSubmit, onValid, control } = useConditionHook();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleSubmit(onValid)}
    >
      <Controller
        name="userId"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField label="ユーザーID" {...field} />}
      />
      <Controller
        name="userName"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField label="ユーザー名" {...field} />}
      />
      <Button type="submit" variant="contained">
        検索
      </Button>
    </Box>
  );
};
