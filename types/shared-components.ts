export interface EdgecaseContainerProps {
  title: string;
  description: string;
  type?: "default" | "error" | "dark";
  children?: React.ReactNode;
}
