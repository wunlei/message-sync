export type ChatMessageProps = {
  timestamp: number;
  message: string;
  messageId?: string;
  type: "incoming" | "outgoing";
  participant?: string;
  status?: "sent" | "delivered" | "read";
  replyMessage?: string;
  number: string;
};
