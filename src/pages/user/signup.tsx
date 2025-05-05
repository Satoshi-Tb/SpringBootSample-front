import React from "react";
import Detail from "@/components/model/user/Detail";
import { BaseLayout } from "@/components/model/layout";
import { Container } from "@mui/material";

const signup = () => {
  return (
    <BaseLayout showSideBar={false}>
      <Container maxWidth="md">
        <Detail editMode="create" />
      </Container>
    </BaseLayout>
  );
};

export default signup;
