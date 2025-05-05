import React from "react";
import Login from "@/components/model/auth/Login";
import { BaseLayout } from "@/components/model/layout";

const login = () => {
  return (
    <BaseLayout showSideBar={false}>
      <Login />
    </BaseLayout>
  );
};

export default login;
