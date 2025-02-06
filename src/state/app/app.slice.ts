import { CredentialsParams, OutgoingMessageStatus } from "@/api/types";
import {
  ReplyData,
  SendMessagePayload,
  ChatMessage,
  State,
} from "@/state/app/app.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: State = {
  apiTokenInstance: null,
  idInstance: null,
  number: null,
  chatHistory: [],
  chats: {},
  fetchTimestamp: null,
  reply: null,
};

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<SendMessagePayload>) {
      const chat = state.chats[action.payload.chatId];

      if (chat) {
        chat.push(action.payload);
      } else {
        state.chats[action.payload.chatId] = [action.payload];
      }
    },
    sendMessageFulfilled(state, action: PayloadAction<ChatMessage>) {
      const chat = state.chats[action.payload.chatId];

      if (chat) {
        const message = chat.find((el) => {
          if (el.tempId && action.payload.tempId) {
            return el.tempId === action.payload.tempId;
          }
          return false;
        });

        if (message) {
          message.idMessage = action.payload.idMessage;
        }
      } else {
        state.chats[action.payload.chatId] = [action.payload];
      }
    },
    receiveNotification(_state, _action: PayloadAction<CredentialsParams>) {},
    receiveNotificationFulfilled(state, action: PayloadAction<ChatMessage>) {
      const chat = state.chats[action.payload.chatId];

      if (chat) {
        const messageIndex = chat.findIndex(
          (el) => el.idMessage === action.payload.idMessage,
        );

        if (messageIndex > -1) {
          chat[messageIndex] = action.payload;
        } else {
          chat.push(action.payload);
        }
      } else {
        state.chats[action.payload.chatId] = [action.payload];
      }
    },
    updateOutgoingMessageStatus(
      state,
      action: PayloadAction<OutgoingMessageStatus>,
    ) {
      const { chatId, status, timestamp } = action.payload;
      const chatMessages = state.chats[chatId];
      if (!chatMessages) {
        return;
      }
      const message = chatMessages.find(
        (el) => el.idMessage === action.payload.idMessage,
      );

      if (message) {
        if (message.status === "sent") {
          message.timestamp = timestamp;
        }
        message.status = status;
      }
    },

    updateInstanceData(state, action: PayloadAction<CredentialsParams>) {
      state.apiTokenInstance = action.payload.apiTokenInstance;
      state.idInstance = action.payload.idInstance;
    },
    setCurrentNumber(state, action: PayloadAction<string | null>) {
      state.number = action.payload;
    },
    updateReplyData(state, action: PayloadAction<ReplyData | null>) {
      state.reply = action.payload;
    },
    updateTimeoutID(state, action: PayloadAction<number | null>) {
      state.fetchTimestamp = action.payload;
    },
  },
});

export const {
  updateInstanceData,
  setCurrentNumber,
  sendMessage,
  receiveNotification,
  receiveNotificationFulfilled,
  sendMessageFulfilled,
  updateOutgoingMessageStatus,
  updateTimeoutID,
  updateReplyData,
} = slice.actions;

export default slice.reducer;
