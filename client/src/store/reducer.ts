import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType, UpdateChatType } from "./types";

const initialState: ChatType = {
	currentChatIndex: -1,
	pdfFiles: [],
	chatMessages: [],
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setIndex: (state, action: PayloadAction<number>) => {
			state.currentChatIndex = action.payload;
		},
		addFile: (state, action: PayloadAction<string>) => {
			state.currentChatIndex = state.pdfFiles.length;
			state.pdfFiles = [...state.pdfFiles, action.payload];
			state.chatMessages = [...state.chatMessages, []];
		},
		addChatMessages: (state, action: PayloadAction<UpdateChatType>) => {
			const index = action.payload.index;
			state.chatMessages[index] = action.payload.newChat;
		},
	},
});

export const { setIndex, addFile, addChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
