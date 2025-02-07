import { useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { setCurrentNumber } from "@/state/app/app.slice";
import Button from "@/components/commons/Button";
import Input from "@/components/commons/Input";
import Link from "@/components/commons/Link";
import s from "./NewChatForm.module.scss";

function NewChatForm() {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleNumberUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phoneNumber) {
      dispatch(setCurrentNumber(phoneNumber));
    }
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Начать чат</h2>
      <Link
        href="https://green-api.com/docs/api/receiving/technology-http-api/#_2"
        title="Настройки перед началом использования"
      />
      <form className={s.form} onSubmit={handleNumberUpdate}>
        <Input
          labelName="Номер телефона"
          name="tel"
          value={phoneNumber}
          autocomplete="tel"
          onChange={setPhoneNumber}
          required
        />

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}

export default NewChatForm;
