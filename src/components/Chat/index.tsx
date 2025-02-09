import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  selectChatById,
  selectFetchTimestamp,
} from "@/state/app/app.selectors";
import { getChatId } from "@/utils";
import { notificationsDelay } from "@/constants";
import { receiveNotification } from "@/state/app/app.slice";
import { ChatProps } from "@/components/Chat/Chat.types";
import ChatMessage from "@/components/commons/ChatMessage";
import s from "./Chat.module.scss";

function Chat({ apiTokenInstance, number, idInstance }: ChatProps) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) =>
    selectChatById(state, getChatId(number)),
  );
  const fetchTimestamp = useAppSelector(selectFetchTimestamp);

  const delayNotification = useCallback(
    function delayNotification() {
      dispatch(receiveNotification({ apiTokenInstance, idInstance }));
      return setTimeout(function () {
        dispatch(receiveNotification({ apiTokenInstance, idInstance }));
        delayNotification();
      }, notificationsDelay);
    },
    [apiTokenInstance, dispatch, idInstance],
  );

  useEffect(() => {
    const timeoutId = delayNotification();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    apiTokenInstance,
    delayNotification,
    dispatch,
    idInstance,
    fetchTimestamp,
  ]);

  useEffect(() => {}, []);

  return (
    <div className={s.chat}>
      {currentChat &&
        currentChat.map((el) => (
          <ChatMessage
            key={el.timestamp + el.idMessage}
            message={el.messageData.textMessage}
            timestamp={el.timestamp}
            type={el.type}
            status={el.status}
            messageId={el.idMessage}
            number={number}
            replyMessage={
              el.messageData.type === "quotedMessage"
                ? el.messageData.replyMessage
                : ""
            }
            participant={
              el.messageData.type === "quotedMessage"
                ? el.messageData.participant
                : ""
            }
          />
        ))}
    </div>
  );
}

export default memo(Chat);
