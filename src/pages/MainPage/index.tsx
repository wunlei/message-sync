import { Link } from "react-router";
import Button from "@/components/commons/Button";
import LogoIcon from "@/assets/logo.svg?react";
import s from "./MainPage.module.scss";

function MainPage() {
  return (
    <div className={s.page}>
      <LogoIcon className={s.logo} />
      <h1 className={s.title}>
        Отправляйте и получайте сообщения, картинки и видео через стабильный
        шлюз WhatsApp API
      </h1>
      <Link to={"/login"}>
        <Button>Войти</Button>
      </Link>
    </div>
  );
}

export default MainPage;
