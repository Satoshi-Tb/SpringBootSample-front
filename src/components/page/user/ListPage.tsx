import { Paper, Typography, Divider, Container } from "@mui/material";
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
      <Container
        sx={{ width: 1000, flexDirection: "row", display: "flex", padding: 2 }}
      >
        {/* <Paper sx={{ marginRight: 1, minWidth: 300 }}>
          <Filter />
        </Paper> */}
        <Paper>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ユーザー一覧
          </Typography>
          <Divider />
          {/* 検索条件 */}
          <Condition />
          <Divider />
          {/* 検索結果 */}
          <List />
        </Paper>
      </Container>
    </BaseLayout>
  );
};
