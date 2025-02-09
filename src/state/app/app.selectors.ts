import { RootState } from "@/state/store.types";
import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: RootState) => state.app;

export const selectApiTokenInstance = (state: RootState) =>
  selectSlice(state).apiTokenInstance;

export const selectIdInstance = (state: RootState) =>
  selectSlice(state).idInstance;

export const selectCurrentNumber = (state: RootState) =>
  selectSlice(state).number;

export const selectChats = (state: RootState) => selectSlice(state).chats;

export const selectChatById = createSelector(
  [selectChats, (_state: RootState, id: string) => id],
  (chats, id) => chats[id],
);

export const selectFetchTimestamp = (state: RootState) =>
  selectSlice(state).fetchTimestamp;

export const selectReplyData = (state: RootState) => selectSlice(state).reply;
