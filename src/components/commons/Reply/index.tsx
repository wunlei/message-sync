import CrossIcon from "@/assets/cross.svg";
import Button from "@/components/commons/Button";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectReplyData,
  selectCurrentNumber,
} from "@/state/app/app.selectors";
import { updateReplyData } from "@/state/app/app.slice";
import s from "./Reply.module.scss";
import { clsx as c } from "clsx";

function Reply() {
  const dispatch = useAppDispatch();
  const replyData = useAppSelector(selectReplyData);
  const number = useAppSelector(selectCurrentNumber);

  if (!replyData) {
    return null;
  }

  return (
    <div className={s.replyContainer}>
      <div className={c(s.replyBody, s[`replyBody_${replyData.type}`])}>
        <span className={s.replyTitle}>
          {replyData.type === "incoming" ? number : "Вы"}
        </span>
        <span className={s.replyMessage}>{replyData.message}</span>
      </div>
      <Button
        ghost
        icon={<CrossIcon />}
        onClick={() => {
          dispatch(updateReplyData(null));
        }}
      ></Button>
    </div>
  );
}

export default Reply;
