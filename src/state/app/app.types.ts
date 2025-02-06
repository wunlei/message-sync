export type State = {
  idInstance: string | null;
  apiTokenInstance: string | null;
  number: string | null;
  chatHistory: apiMessageType[];
  chats: allChatsType;
  fetchTimestamp: number | null;
  reply: ReplyData | null;
};

export type ReplyData = {
  message: string;
  messageId: string;
  type: "incoming" | "outgoing";
};

export type apiMessageType = {
  type: "outgoing" | "incoming";
  idMessage: string;
  timestamp: number;
  typeMessage: "textMessage" | string;
  chatId: string;
  textMessage: string;
};

export type allChatsType = {
  [index: string]: ChatMessage[] | undefined;
};

export type SendMessagePayload = {
  idMessage: string;
  tempId?: string;
  chatId: string;
  timestamp: number;
  type: "outgoing";
  status: "sent";
  idInstance: string;
  apiTokenInstance: string;
  messageData: QuotedMessage | TextMessage;
};

export type ChatMessage = {
  chatId: string;
  timestamp: number;
  idMessage: string;
  type: "outgoing" | "incoming";
  status?: "read" | "sent" | "delivered";
  messageData: QuotedMessage | TextMessage;
  tempId?: string;
};

export type QuotedMessage = {
  type: "quotedMessage";
  textMessage: string;
  replyToId: string;
  replyMessage: string;
  participant: string;
};

export type TextMessage = {
  type: "textMessage";
  textMessage: string;
};
