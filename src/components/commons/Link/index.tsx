import { LinkProps } from "@/components/commons/Link/Link.types";
import s from "./Link.module.scss";

function Link({ href, title }: LinkProps) {
  return (
    <a className={s.link} href={href} target="_blank">
      {title}
    </a>
  );
}

export default Link;
