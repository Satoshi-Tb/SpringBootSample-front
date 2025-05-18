import { Paper, Typography, Box } from "@mui/material";
import { BaseLayout } from "@/components/model/layout";
import { List } from "@/components/model/user/List";
import { Condition } from "@/components/model/user/Condition";
import { useState } from "react";

export type UserType = {
  id: string | number;
  userId: string;
  password: string;
  userName: string;
};

export const ListPage = () => {
  // upload状態をリフトアップ(upload処理のisMutatingの監視)
  const [isUploading, setIsUploading] = useState(false);
  // ★子コンポーネントから親に状況を渡すことは可能。ただし、ページ切り替えされると、デフォルト状態に戻る。
  const handleLoadingChange = (isLoading: boolean) => {
    setIsUploading(isLoading);
  };

  return (
    <BaseLayout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Paper sx={{ m: 1, width: "90%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, borderBottom: "2px solid" }}
          >
            ユーザー一覧
          </Typography>
          {/* 検索条件 */}
          <Condition
            isUploading={isUploading}
            handleLoadingChange={handleLoadingChange}
          />
          {/* 検索結果 */}
          <List isUploading={isUploading} />
        </Paper>
      </Box>
    </BaseLayout>
  );
};
