import { BaseLayout } from "@/components/model/layout";
import Detail from "@/components/model/user/Detail";
import { Container } from "@mui/material";

export const DetailPage = () => {
  return (
    <BaseLayout>
      <Container maxWidth="md">
        <Detail />
      </Container>
    </BaseLayout>
  );
};
