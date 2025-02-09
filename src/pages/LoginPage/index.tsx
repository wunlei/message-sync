import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/state/hooks";
import { updateInstanceData } from "@/state/app/app.slice";
import Input from "@/components/commons/Input";
import Button from "@/components/commons/Button";
import Link from "@/components/commons/Link";
import s from "./LoginPage.module.scss";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [idInstance, setIdInstance] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      updateInstanceData({
        apiTokenInstance: apiTokenInstance,
        idInstance: idInstance,
      }),
    );

    navigate("/chat");
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
        <h2 className={s.title}>Вход</h2>
        <Link
          href="https://green-api.com/docs/before-start/"
          title="Как получить инстанс?"
        />
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            labelName="idInstance"
            name="idInstance"
            value={idInstance}
            autocomplete="idInstance"
            placeholder="idInstance"
            onChange={(e) => {
              setIdInstance(e.trim());
            }}
            required
          />
          <Input
            labelName="apiTokenInstance"
            name="apiTokenInstance"
            value={apiTokenInstance}
            autocomplete="apiTokenInstance"
            placeholder="apiTokenInstance"
            onChange={(e) => {
              setApiTokenInstance(e.trim());
            }}
            required
          />

          <Button type="submit">Войти</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
