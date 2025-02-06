export type InputProps = {
  labelName: string;
  value: string;
  name: string;
  onChange: (e: string) => void;
  required?: boolean;
  autocomplete?: string;
  ghost?: boolean;
  placeholder?: string;
};
