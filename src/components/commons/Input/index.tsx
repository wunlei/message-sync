import { clsx as c } from "clsx";
import { InputProps } from "@/components/commons/Input/Input.types";
import s from "./Input.module.scss";

function Input({
  labelName,
  value,
  name,
  required,
  autocomplete,
  ghost,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <label className={c(s.label)}>
      <span className={c(required && s.labelRequired)}>{labelName}</span>
      <input
        name={name}
        autoComplete={autocomplete}
        className={c(s.input, ghost && s.inputGhost)}
        required={required}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default Input;
