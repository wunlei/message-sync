export type TextareaProps = {
  labelName: string;
  value: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (e: string) => void;
  onEnter?: () => void;
};
