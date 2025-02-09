import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/state/hooks";
import { getChatId } from "@/utils";
import {
  QuotedMessage,
  SendMessagePayload,
  TextMessage,
} from "@/state/app/app.types";
import {
  sendMessage,
  setCurrentNumber,
  updateReplyData,
} from "@/state/app/app.slice";
import {
  selectApiTokenInstance,
  selectCurrentNumber,
  selectIdInstance,
  selectReplyData,
} from "@/state/app/app.selectors";
import Button from "@/components/commons/Button";
import Chat from "@/components/Chat";
import MessageInput from "@/components/MessageInput";
import NewChatForm from "@/components/commons/NewChatForm";
import Reply from "@/components/commons/Reply";
import NewChatIcon from "@/assets/new-chat.svg?react";
import s from "./ChatPage.module.scss";

function ChatPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentNumber = useSelector(selectCurrentNumber);
  const replyData = useSelector(selectReplyData);
  const idInstance = useSelector(selectIdInstance);
  const apiTokenInstance = useSelector(selectApiTokenInstance);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) {
      navigate("/login");
    }
  }, [apiTokenInstance, idInstance, navigate]);

  if (!idInstance || !apiTokenInstance) {
    return null;
  }

  if (!currentNumber) {
    return <NewChatForm />;
  }

  function handleSendMessage(message: string) {
    if (!currentNumber || !idInstance || !apiTokenInstance) {
      return;
    }

    const timestamp = Date.now() / 1000;

    let messageData: QuotedMessage | TextMessage = {
      type: "textMessage",
      textMessage: message,
    };

    if (replyData) {
      messageData = {
        type: "quotedMessage",
        replyMessage: replyData.message,
        replyToId: replyData.messageId,
        textMessage: message,
        participant: replyData.type === "incoming" ? currentNumber : "",
      };
    }

    const payload: SendMessagePayload = {
      chatId: getChatId(currentNumber),
      apiTokenInstance,
      idInstance,
      timestamp,
      messageData,
      tempId: `${currentNumber}${timestamp}${message}`,
      status: "sent",
      type: "outgoing",
      idMessage: "",
    };
    dispatch(sendMessage(payload));

    dispatch(updateReplyData(null));
  }

  return (
    <div className={s.page}>
      <div className={s.chatHeader}>
        <h2 className={s.title}>Чат с {currentNumber}</h2>
        <Button
          ghost
          icon={<NewChatIcon />}
          onClick={() => dispatch(setCurrentNumber(null))}
        ></Button>
      </div>
      <div className={s.chatContainer}>
        <Chat
          apiTokenInstance={apiTokenInstance}
          number={currentNumber}
          idInstance={idInstance}
        />
        <div className={s.footer}>
          <Reply />
          <MessageInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
