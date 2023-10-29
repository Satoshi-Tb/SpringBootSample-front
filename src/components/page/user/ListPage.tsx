import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { BaseLayout } from "@/components/model/layout";
import { List } from "@/components/model/user/List";
import { Condition } from "@/components/model/user/Condition";

export const ListPage = () => {
  return (
    <BaseLayout>
      <Container maxWidth="md">
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
