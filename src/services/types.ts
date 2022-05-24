export interface ApiResponse<T> {
	data: T;
	message: string;
	isSuccess: boolean;
}

export interface AuthToken {
	token: string;
	expiryDateTime: string;
}

export interface Auth {
	id: string;
	username: string;
	permissions: string[];
	token: AuthToken;
}

export interface Illustration {
	id: number;
	date: Date;
	title: string;
	caption: string;
	image: Media;
	content: string;
}

export interface Media {
	id: number;
	source: string;
	title: string;
}

export interface CrawlerResponse<T> {
	data?: T;
	status: number;
	total: number;
	totalPages: number;
}

export interface RawIllustration {
	id: number;
	date: Date;
	title: RawContent;
	content: RawContent;
	meta: RawMeta;
	_embedded: EmbeddedData;
}

export interface RawContent {
	rendered: string;
}

export interface RawMeta {
	Caption: string[];
}

export interface EmbeddedData {
	"wp:featuredmedia": RawMedia[];
}

export interface RawMedia {
	id: number;
	source_url: string;
	title: RawContent;
}

export interface Artist {
	name: string;
	id: number;
}

export interface Title {
	name: string;
	id: number;
}

export interface Subject {
	name: string;
	id: number;
}
