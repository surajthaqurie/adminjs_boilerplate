import { ComponentLoader } from "adminjs";
export const componentLoader = new ComponentLoader();

export const Components = {
  Dashboard: componentLoader.add("Dashboard", "./Dashboard"),
  TextEditor: componentLoader.add("TextEditor", "./TextEditor"),
  ShowTextEditor: componentLoader.add("ShowTextEditor", "./ShowTextEditor"),
  NumberInput: componentLoader.add("NumberInput", "./NumberInput"),
  ChangePassword: componentLoader.add("ChangePassword", "./ChangePassword"),
  CustomPassword: componentLoader.add("CustomPassword", "./CustomPassword"),
  ConfirmPassword: componentLoader.add("ConfirmPassword", "./ConfirmPassword")
};

export const OverridableComponent = {
  SidebarResourceSection: componentLoader.override("SidebarResourceSection", "./overridable/SidebarResourceSection"),
  SidebarFooter: componentLoader.override("SidebarFooter", "./overridable/SidebarFooter")
};

export const Pages = {
  Setting: componentLoader.add("Setting", "./page/Setting")
};
