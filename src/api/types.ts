export type CredentialsParams = {
  idInstance: string;
  apiTokenInstance: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type SendMessageParams = {
  chatId: string;
  textMessage: string;
  quotedMessageId?: string;
} & CredentialsParams;

export type ReceiveNotificationParams = {
  receiveTimeout?: number;
} & CredentialsParams;

export type DeleteNotificationParams = {
  receiptId: number;
} & CredentialsParams;

export type ReceiveNotificationResponse = {
  receiptId: number;
  body:
    | OutgoingMessageReceived
    | IncomingMessageReceived
    | OutgoingMessageStatus;
};

type MessageResponseBody = {
  timestamp: number;
  idMessage: string;
};

type MessageDataText = {
  typeMessage: "textMessage";
  textMessageData: {
    textMessage: string;
  };
};

type MessageDataQuoted = {
  typeMessage: "quotedMessage";
  extendedTextMessageData: {
    text: string;
    stanzaId: string;
    participant: string;
  };
  quotedMessage: {
    stanzaId: string;
    participant: string;
    typeMessage: string;
    textMessage: string;
  };
};

interface OutgoingMessageReceived extends MessageResponseBody {
  typeWebhook: "outgoingMessageReceived" | "outgoingAPIMessageReceived";
  senderData: {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
    senderContactName: string;
  };
  messageData: MessageDataText | MessageDataQuoted;
}

interface IncomingMessageReceived
  extends Omit<OutgoingMessageReceived, "typeWebhook"> {
  typeWebhook: "incomingMessageReceived";
}

export interface OutgoingMessageStatus extends MessageResponseBody {
  typeWebhook: "outgoingMessageStatus";
  status: "sent" | "delivered" | "read";
  chatId: string;
}
