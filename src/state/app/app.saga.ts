import { PayloadAction } from "@reduxjs/toolkit";

import {
  apiSendMessage,
  apiReceiveNotification,
  apiDeleteNotification,
} from "@/api";

import {
  CredentialsParams,
  ReceiveNotificationResponse,
  SendMessageResponse,
} from "@/api/types";

import {
  receiveNotification,
  receiveNotificationFulfilled,
  sendMessage,
  sendMessageFulfilled,
  updateOutgoingMessageStatus,
  updateTimeoutID,
} from "@/state/app/app.slice";

import { SendMessagePayload, ChatMessage } from "@/state/app/app.types";

import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

function* sendMessageSaga(action: PayloadAction<SendMessagePayload>) {
  try {
    const { apiTokenInstance, chatId, idInstance, messageData } =
      action.payload;
    const { textMessage } = messageData;

    let quotedMessageId;
    if (messageData.type === "quotedMessage") {
      quotedMessageId = messageData.replyToId;
    }

    const response: SendMessageResponse = yield call(apiSendMessage, {
      apiTokenInstance,
      chatId,
      idInstance,
      textMessage,
      quotedMessageId,
    });

    yield put(
      sendMessageFulfilled({
        ...action.payload,
        idMessage: response.idMessage,
      }),
    );
  } catch (e) {
    console.error(e);
  }
}

function* getNotificationSaga(action: PayloadAction<CredentialsParams>) {
  try {
    const response: ReceiveNotificationResponse = yield call(
      apiReceiveNotification,
      action.payload,
    );

    if (response.receiptId) {
      yield call(apiDeleteNotification, {
        ...action.payload,
        receiptId: response.receiptId,
      });
    }

    if (
      response.body.typeWebhook === "incomingMessageReceived" ||
      response.body.typeWebhook === "outgoingMessageReceived"
    ) {
      const { idMessage, messageData, senderData, timestamp } = response.body;

      const { typeMessage } = messageData;

      const result: ChatMessage = {
        chatId: senderData.chatId,
        idMessage,
        messageData: {
          replyMessage: "",
          replyToId: "",
          textMessage: "",
          participant: "",
          type: "quotedMessage",
        },
        timestamp,
        type:
          response.body.typeWebhook === "incomingMessageReceived"
            ? "incoming"
            : "outgoing",
      };

      if (typeMessage === "quotedMessage") {
        result.messageData = {
          type: "quotedMessage",
          textMessage: messageData.extendedTextMessageData.text,
          replyToId: messageData.quotedMessage.stanzaId,
          replyMessage: messageData.quotedMessage.textMessage,
          participant: messageData.quotedMessage.participant,
        };
      }
      if (typeMessage === "textMessage") {
        result.messageData = {
          type: "textMessage",
          textMessage: messageData.textMessageData.textMessage,
        };
      }
      yield put(receiveNotificationFulfilled(result));
    }
    if (response.body.typeWebhook === "outgoingMessageStatus") {
      yield put(updateOutgoingMessageStatus(response.body));
    }

    yield put(updateTimeoutID(Date.now()));
  } catch (e) {
    console.error(e);
  }
}

function* watcherSaga() {
  yield all([
    takeEvery(sendMessage.type, sendMessageSaga),
    takeLatest(receiveNotification.type, getNotificationSaga),
  ]);
}

export default function* rootSaga() {
  yield fork(watcherSaga);
}
