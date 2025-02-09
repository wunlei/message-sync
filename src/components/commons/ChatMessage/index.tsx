import { memo } from "react";
import { clsx as c } from "clsx";
import { useAppDispatch } from "@/state/hooks";
import { updateReplyData } from "@/state/app/app.slice";
import { formatDate, getChatId } from "@/utils";
import { ChatMessageProps } from "@/components/commons/ChatMessage/ChatMessage.types";
import DoubleChecksIcon from "@/assets/check-double.svg?react";
import SingleCheckIcon from "@/assets/check-single.svg?react";
import ArrowIcon from "@/assets/reply-arrow.svg?react";
import Tail from "@/assets/tail.svg?react";
import s from "./ChatMessage.module.scss";

function ChatMessage({
  message,
  timestamp,
  type,
  status,
  messageId,
  replyMessage,
  number,
  participant,
}: ChatMessageProps) {
  const dispatch = useAppDispatch();

  const time = formatDate(timestamp);

  const isQuoteByNumber =
    participant === number || participant === getChatId(number);

  return (
    <div className={c(s.container, s[`container_${type}`])}>
      <div className={c(s.message, s[`message_${type}`])}>
        {replyMessage && (
          <div
            className={c(
              s.replyContainer,
              s[`reply_${isQuoteByNumber ? "outgoing" : "incoming"}`],
            )}
          >
            <span className={s.replyTitle}>
              {isQuoteByNumber ? number : "Вы"}
            </span>
            <span>{replyMessage}</span>
          </div>
        )}

        <span className={s.text}>{message}</span>

        <div className={s.footer}>
          <span className={s.time}>{time}</span>
          {status && (
            <>
              {status === "sent" ? (
                <SingleCheckIcon className={s.checkIcon} />
              ) : (
                <DoubleChecksIcon
                  className={c(
                    status === "read" ? s.checkIconRead : s.checkIcon,
                  )}
                />
              )}
            </>
          )}
        </div>
        <div className={s.replyArrow}>
          <ArrowIcon
            onClick={() => {
              if (messageId) {
                dispatch(
                  updateReplyData({
                    message,
                    type,
                    messageId,
                  }),
                );
              }
            }}
          />
        </div>
        <Tail className={s.tail} />
      </div>
    </div>
  );
}

export default memo(ChatMessage);
