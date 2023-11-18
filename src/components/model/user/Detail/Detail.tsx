import { useRouter } from "next/router";
import React from "react";

export const Detail = () => {
  const router = useRouter();
  const { userId } = router.query;
  return <div>Detail {userId}</div>;
};
