import axios from "axios";
import { ApiResponse, Auth } from "./types";
import config from "../config.json";
import { ErrorMessages } from "../common/constants/errorMessages";

export default class ApiService {
	static auth = async (
		username: string,
		password: string
	): Promise<ApiResponse<Auth>> => {
		return await ApiService.postAsync(config.api.endpoints.auth, {
			username,
			password,
		});
	};

	/* Core methods */
	private static postAsync = async <T, K>(
		endpoint: string,
		data: T
	): Promise<ApiResponse<K>> => {
		try {
			let result = await axios.post<ApiResponse<K>>(
				`${config.api.baseUrl}/${endpoint}`,
				data
			);
			if (result.status == 200) return result.data;
			else return this.errorResponse<K>(ErrorMessages.UnexpectedError);
		} catch (err) {
			console.error(err);
			return this.errorResponse<K>(ErrorMessages.UnexpectedError);
		}
	};

	private static errorResponse = <T>(errorMessage: string): ApiResponse<T> => {
		return {
			message: errorMessage,
			isSuccess: false,
		} as ApiResponse<T>;
	};
}
