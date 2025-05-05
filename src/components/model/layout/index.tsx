import { ReactNode } from "react";
import { Header as HeaderImpl } from "./Header";
import { SideBar as SideBarImpl } from "./SideBar";
import { BaseLayout as BaseLayoutImpl } from "./BaseLayout";
import { SimpleLayoutImple } from "./SimpleLayout";

export const Header = () => {
  return <HeaderImpl />;
};

export const SideBar = () => {
  return <SideBarImpl />;
};

type BaseLayoutProps = {
  children: ReactNode;
  showSideBar?: boolean;
};
export const BaseLayout = ({
  children,
  showSideBar = true,
}: BaseLayoutProps) => {
  return <BaseLayoutImpl showSideBar={showSideBar}>{children}</BaseLayoutImpl>;
};

export const SimpleLayout = ({ children }: { children: ReactNode }) => {
  return <SimpleLayoutImple>{children}</SimpleLayoutImple>;
};
