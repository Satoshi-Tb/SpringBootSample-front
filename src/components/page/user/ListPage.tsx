import { Paper, Typography, Divider, Container, Box } from "@mui/material";
import { BaseLayout } from "@/components/model/layout";
import { List } from "@/components/model/user/List";
import { Condition } from "@/components/model/user/Condition";
import Filter from "@/components/model/user/Filter/Filter";

export type UserType = {
  id: string | number;
  userId: string;
  password: string;
  userName: string;
};

export const ListPage = () => {
  return (
    <BaseLayout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Paper sx={{ m: 1, width: "80%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, borderBottom: "2px solid" }}
          >
            ユーザー一覧
          </Typography>
          {/* 検索条件 */}
          <Condition />
          {/* 検索結果 */}
          <List />
        </Paper>
      </Box>
    </BaseLayout>
  );
};
