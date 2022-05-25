import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ErrorMessages } from "../../common/constants/errorMessages";
import { Routes } from "../../common/constants/routes";
import { Status } from "../../common/constants/status";
import BookCard from "../../components/bookCard/bookCard";
import CrawlerService from "../../services/crawlerService";
import { Illustration } from "../../services/types";
import ListPage from "../listPage/listPage";

export default function IllustrationsPage() {
	const [illustrations, setIllustrations] = useState([] as Illustration[]);
	const [title, setTitle] = useState("");
	const [alert, setAlert] = useState("");
	const [, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [status, setStatus] = useState(Status.Idle);

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (status !== Status.Idle) return;
		loadIllustrations().catch((e) => {
			console.error(e);
			setStatus(Status.Error);
			navigate(Routes.NotFound);
		});
	});

	const loadIllustrations = async (): Promise<void> => {
		setStatus(Status.Pending);

		const { artist, title, subject, page, search } = getSearchParams();

		setCurrentPage(page);
		setSearchText(search ?? "");

		const { status, data, totalPages } = await CrawlerService.getIllustrations(
			12,
			page,
			subject,
			artist,
			title,
			search
		);

		if (status !== 200) {
			setStatus(Status.Error);
			setAlert(ErrorMessages.UnexpectedError);
			return;
		}

		if (!data) {
			setStatus(Status.Done);
			return;
		}

		try {
			if (subject) await loadSubject(subject);
			else if (artist) await loadArtist(artist);
			else if (title) await loadTitle(title);
		} catch (e) {
			console.error(e);
		}

		setStatus(Status.Done);
		setIllustrations(data);
		setTotalPages(totalPages);
	};

	const loadArtist = async (artist: string): Promise<void> => {
		const { status, data } = await CrawlerService.getArtist(artist);

		if (status !== 200 || !data) return;
		setTitle(data.name);
	};

	const loadTitle = async (title: string): Promise<void> => {
		const { status, data } = await CrawlerService.getTitle(title);
		if (status !== 200 || !data) return;
		setTitle(data.name);
	};

	const loadSubject = async (subject: string): Promise<void> => {
		const { status, data } = await CrawlerService.getSubject(subject);
		if (status !== 200 || !data) return;
		setTitle(data.name);
	};

	const changePage = (page: number, searchParam?: string) => {
		const { artist, title, subject, search } = getSearchParams();
		if (
			(page === currentPage && searchParam === search) ||
			page < 1 ||
			(totalPages !== 0 && page > totalPages)
		)
			return;

		setStatus(Status.Idle);

		let query = buildQueryString(page, artist, title, subject, searchParam);

		navigate(`${location.pathname}${query}`);
	};

	const buildQueryString = (
		page: number,
		artist?: string,
		title?: string,
		subject?: string,
		searchParam?: string
	) => {
		let query = "";
		if (artist) query = `artist=${artist}`;
		if (title) query = `${query && `${query}&`}title=${title}`;
		if (subject) query = `${query && `${query}&`}subject=${subject}`;
		if (searchParam) query = `${query && `${query}&`}search=${searchParam}`;
		if (page > 1) query = `${query && `${query}&`}page=${page}`;

		return query ? `?${query}` : query;
	};

	const getSearchParams = () => {
		const artist = searchParams.get("artist") ?? undefined;
		const title = searchParams.get("title") ?? undefined;
		const subject = searchParams.get("subject") ?? undefined;
		const page = Number(searchParams.get("page")) ?? 1;
		const search = searchParams.get("search") ?? undefined;
		return { artist, title, subject, page: page <= 0 ? 1 : page, search };
	};

	const { search } = getSearchParams();
	return (
		<ListPage
			alert={alert}
			setAlert={setAlert}
			status={status}
			changePage={changePage}
			currentPage={currentPage}
			renderCard={(item) => (
				<BookCard
					title={item.title}
					imgSrc={item.imgSrc}
					subTitle={item.subTitle}
					author={item.author}
					content={item.content}
					date={item.date}
				/>
			)}
			title={title ? title : "All Illustrations"}
			totalPages={totalPages}
			items={illustrations.map((i) => ({
				id: i.id,
				title: i.title,
				subTitle: i.caption,
				imgSrc: i.image.source,
				content: i.content,
				author: i.author,
				date: i.date,
			}))}
			search={search}
		/>
	);
}
