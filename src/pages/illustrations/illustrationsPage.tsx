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
		loadIllustrations();
	});

	const loadIllustrations = () => {
		setStatus(Status.Pending);
		const { artist, title, subject, page, search } = getSearchParams();
		setCurrentPage(page);
		setSearchText(search ?? "");
		CrawlerService.getIllustrations(12, page, subject, artist, title, search)
			.then((data) => {
				if (data.status !== 200) {
					setAlert(ErrorMessages.UnexpectedError);
					return;
				}

				if (!data.data) return;

				if (subject) loadSubject(subject);
				else if (artist) loadArtist(artist);
				else if (title) loadTitle(title);
				else setStatus(Status.Done);
				setIllustrations(data.data);
				setTotalPages(data.totalPages);
			})
			.catch((e) => {
				console.debug(e);
				navigate(Routes.NotFound, { replace: true });
			});
	};

	const loadArtist = (artist: string) => {
		CrawlerService.getArtist(artist)
			.then((a) => {
				if (a.status !== 200 || !a.data) return;
				setTitle(a.data.name);
				setStatus(Status.Done);
			})
			.catch(() => setStatus(Status.Done));
	};

	const loadTitle = (title: string) => {
		CrawlerService.getTitle(title)
			.then((t) => {
				if (t.status !== 200 || !t.data) return;
				setTitle(t.data.name);
				setStatus(Status.Done);
			})
			.catch(() => setStatus(Status.Done));
	};

	const loadSubject = (subject: string) => {
		CrawlerService.getSubject(subject)
			.then((s) => {
				if (s.status !== 200 || !s.data) return;
				setTitle(s.data.name);
				setStatus(Status.Done);
			})
			.catch(() => setStatus(Status.Done));
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
		let query = "";
		if (artist) query = `artist=${artist}`;
		if (title) query = `${query && `${query}&`}title=${title}`;
		if (subject) query = `${query && `${query}&`}subject=${subject}`;
		if (searchParam) query = `${query && `${query}&`}search=${searchParam}`;
		if (page > 1) query = `${query && `${query}&`}page=${page}`;
		navigate(`${location.pathname}${query && "?"}${query}`);
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
