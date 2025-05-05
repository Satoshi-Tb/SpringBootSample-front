import React from "react";
import { Typography, Divider, Drawer, List, ListItem } from "@mui/material";
import Link from "next/link";

export const SideBar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          marginTop: 8, // AppBarの高さ分オフセット
        },
      }}
    >
      <Divider />
      <List>
        <ListItem>
          <Typography>
            <Link href="/user/list">ユーザー一覧</Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>メニュー2</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <Link href="/">ログアウト</Link>
          </Typography>
        </ListItem>
        {/* 他のメニューアイテムを追加 */}
      </List>
    </Drawer>
  );
};
