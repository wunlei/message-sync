import { useEffect, useRef } from "react";
import { clsx as c } from "clsx";
import { TextareaProps } from "@/components/commons/Textarea/Textarea.types";
import s from "./Textarea.module.scss";

function Textarea({
  labelName,
  value,
  name,
  placeholder,
  maxLength,
  onChange,
  onEnter,
}: TextareaProps) {
  const inputRef = useRef<null | HTMLTextAreaElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const element = inputRef.current;
    resetHeight();
    if (element) {
      const scroll = element.scrollHeight;
      const height = scroll > 150 ? 150 : scroll;
      element.style.height = height + "px";

      if (scroll > 150) {
        element.style.overflow = "auto";
      } else {
        element.style.overflow = "hidden";
      }
    }

    onChange(e.target.value);
  }

  useEffect(() => {
    if (!value) {
      resetHeight();
    }
  }, [value]);

  function resetHeight() {
    const element = inputRef.current;
    if (element) {
      element.style.height = "auto";
    }
  }

  return (
    <label className={s.label}>
      {labelName}
      <textarea
        rows={1}
        maxLength={maxLength}
        ref={inputRef}
        name={name}
        className={c(s.input)}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) {
              return;
            }
            e.preventDefault();
            if (onEnter && value) {
              resetHeight();
              onEnter();
            }
          }
        }}
      />
    </label>
  );
}

export default Textarea;
