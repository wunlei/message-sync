import { useState } from "react";
import { MessageInputProps } from "@/components/MessageInput/MessageInput.types";
import SendIcon from "@/assets/send.svg";
import Button from "@/components/commons/Button";
import Textarea from "@/components/commons/Textarea";
import s from "./MessageInput.module.scss";

function MessageInput({ handleSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  return (
    <div className={s.inputContainer}>
      <Textarea
        labelName=""
        name="message"
        maxLength={20000}
        onChange={setMessage}
        value={message}
        placeholder="Введите сообщение"
        onEnter={() => {
          handleSendMessage(message);
          setMessage("");
        }}
      />

      <Button
        disabled={!message}
        onClick={() => {
          handleSendMessage(message);
          setMessage("");
        }}
        ghost
        icon={<SendIcon />}
      />
    </div>
  );
}
export default MessageInput;
