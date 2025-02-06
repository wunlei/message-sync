export interface ButtonProps extends React.PropsWithChildren {
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  ghost?: boolean;
  formId?: string;
  classes?: string[];
  disabled?: boolean;
  onClick?: () => void;
}
