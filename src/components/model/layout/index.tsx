import { ReactNode } from "react";
import { Header as HeaderImpl } from "./Header";
import { SideBar as SideBarImpl } from "./SideBar";
import { BaseLayout as BaseLayoutImpl } from "./BaseLayout";

export const Header = () => {
  return <HeaderImpl />;
};

export const SideBar = () => {
  return <SideBarImpl />;
};

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayoutImpl>{children}</BaseLayoutImpl>;
};
