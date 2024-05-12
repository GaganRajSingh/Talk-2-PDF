export interface ChatType {
	currentChatIndex: number;
	pdfFiles: string[];
	chatMessages: string[][];
}

export interface UpdateChatType {
	index: number;
	newChat: string[];
}
