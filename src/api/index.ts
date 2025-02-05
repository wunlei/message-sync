import {
  DeleteNotificationParams,
  ReceiveNotificationParams,
  ReceiveNotificationResponse,
  SendMessageParams,
  SendMessageResponse,
} from "@/api/types";
import { BASE_URL, URL_PATH } from "@/constants/api";
import { fetchWrapper, getURLPath } from "@/utils/api";

export function apiSendMessage({
  apiTokenInstance,
  chatId,
  idInstance,
  textMessage,
  quotedMessageId,
}: SendMessageParams): Promise<SendMessageResponse> {
  const url = new URL(
    getURLPath(idInstance, apiTokenInstance, URL_PATH.sendMessage),
    BASE_URL,
  );

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId: chatId,
      message: textMessage,
      quotedMessageId,
    }),
  };

  return fetchWrapper(fetch(url, options)).then((response) => response.json());
}

export function apiReceiveNotification({
  apiTokenInstance,
  idInstance,
  receiveTimeout = 60,
}: ReceiveNotificationParams): Promise<ReceiveNotificationResponse> {
  const url = new URL(
    `${getURLPath(idInstance, apiTokenInstance, URL_PATH.receiveNotification)}?receiveTimeout=${receiveTimeout}`,
    BASE_URL,
  );

  const options = { method: "GET" };

  return fetchWrapper(fetch(url, options)).then((response) => response.json());
}

export function apiDeleteNotification({
  apiTokenInstance,
  idInstance,
  receiptId,
}: DeleteNotificationParams) {
  const url = new URL(
    `${getURLPath(idInstance, apiTokenInstance, URL_PATH.deleteNotification)}/${receiptId}`,
    BASE_URL,
  );

  const options = { method: "DELETE" };

  return fetchWrapper(fetch(url, options));
}
