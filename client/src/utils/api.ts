import { FLASK_BASE_URL, FLASK_QUERY_URL, FLASE_UPLOAD_URL } from "./constants";
import axios, { AxiosResponse, AxiosError } from "axios";
import { queryResponse } from "./api.types";

const sendQuery = async (question: string): Promise<string> => {
	try {
		const response: AxiosResponse<queryResponse> = await axios.post(
			FLASK_BASE_URL + FLASK_QUERY_URL,
			{ query: question }
		);
		return response.data.message;
	} catch (error) {
		return "Error: " + (error as AxiosError).message;
	}
};

const uploadFile = async (file: File): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append("file", file);

		const response: AxiosResponse<queryResponse> = await axios.post(
			FLASK_BASE_URL + FLASE_UPLOAD_URL,
			// { file: file }
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data.message;
	} catch (error) {
		return "Error: " + (error as AxiosError).message;
	}
};

export { sendQuery, uploadFile };
