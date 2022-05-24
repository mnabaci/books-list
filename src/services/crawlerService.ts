import axios from "axios";
import config from "../config.json";
import {
	CrawlerResponse,
	Illustration,
	Artist,
	RawIllustration,
	Title,
	Subject,
} from "./types";

export default class CrawlerService {
	static getArtist = async (id: string): Promise<CrawlerResponse<Artist>> => {
		const { status, data } = await axios.get<Artist>(
			`${config.crawler.baseUrl}/${config.crawler.endpoints.artists}/${id}`
		);

		if (status !== 200 || !data)
			return { status: status, total: 0, totalPages: 0 };

		return {
			data: data,
			status: status,
		} as CrawlerResponse<Artist>;
	};

	static getTitle = async (id: string): Promise<CrawlerResponse<Title>> => {
		const { status, data } = await axios.get<Title>(
			`${config.crawler.baseUrl}/${config.crawler.endpoints.titles}/${id}`
		);

		if (status !== 200 || !data)
			return { status: status, total: 0, totalPages: 0 };

		return {
			data: data,
			status: status,
		} as CrawlerResponse<Title>;
	};

	static getSubject = async (id: string): Promise<CrawlerResponse<Subject>> => {
		const { status, data } = await axios.get<Subject>(
			`${config.crawler.baseUrl}/${config.crawler.endpoints.subjects}/${id}`
		);

		if (status !== 200 || !data)
			return { status: status, total: 0, totalPages: 0 };

		return {
			data: data,
			status: status,
		} as CrawlerResponse<Subject>;
	};

	static getIllustrations = async (
		count: number,
		page?: number,
		subjects?: string,
		artists?: string,
		titles?: string,
		search?: string
	): Promise<CrawlerResponse<Illustration[]>> => {
		try {
			const { status, data, headers } = await axios.get<RawIllustration[]>(
				`${config.crawler.baseUrl}/${
					config.crawler.endpoints.illustrations
				}?per_page=${count}${page ? `&page=${page}` : ""}${
					subjects ? `&subjects=${subjects}` : ""
				}${artists ? `&artists=${artists}` : ""}${
					titles ? `&titles=${titles}` : ""
				}${search ? `&search=${search}` : ""}&_embed`
			);

			if (status !== 200) return { status: status, total: 0, totalPages: 0 };
			let illustrations: Illustration[] = data.map(
				(data) =>
					({
						id: data.id,
						caption: data.meta.Caption[0],
						content: data.content.rendered,
						date: data.date,
						author:
							data._embedded.author && data._embedded.author.length > 0
								? data._embedded.author[0].name
								: "",
						image: {
							id: data._embedded["wp:featuredmedia"][0].id,
							source: data._embedded["wp:featuredmedia"][0].source_url,
							title: data._embedded["wp:featuredmedia"][0].title.rendered,
						},
						title: data.title.rendered,
					} as Illustration)
			);

			return {
				total: Number(headers["x-wp-total"]),
				totalPages: Number(headers["x-wp-totalpages"]),
				data: illustrations,
				status: status,
			} as CrawlerResponse<Illustration[]>;
		} catch (e) {
			console.debug(e);
			throw e;
		}
	};
}
