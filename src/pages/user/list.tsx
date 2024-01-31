import { withLoading } from "@/components/model/hooks/withLoading";
import { withLogger } from "@/components/model/hooks/withLogger";
import { ListPage } from "@/components/page/user/ListPage";
import React from "react";

const list = () => {
  return <ListPage />;
};

// 外側のコンポーネントから適用される。
// ただし、useEffectは内側から実施されているように見える。
const LoggingList = withLogger(withLoading(list));

export default LoggingList;
