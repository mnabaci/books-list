import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
	Col,
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
} from "reactstrap";
import { Routes } from "../../common/constants/routes";
import { Status } from "../../common/constants/status";
import BookCard from "../../components/bookCard/bookCard";
import Loading from "../../components/loading/loading";
import CrawlerService from "../../services/crawlerService";
import { Illustration } from "../../services/types";
import illustrationsPageStyles from "./illustrationsPage.module.css";

export default function IllustrationsPage() {
	const [illustrations, setIllustrations] = useState([] as Illustration[]);
	const [title, setTitle] = useState("");
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
		const { artist, title, subject, page } = getSearchParams();
		setCurrentPage(page);
		CrawlerService.getIllustrations(12, page, subject, artist, title)
			.then((data) => {
				if (data.status !== 200 || !data.data) return;
				if (subject) loadSubject(subject);
				else if (artist) loadArtist(artist);
				else if (title) loadTitle(title);
				else setStatus(Status.Done);
				setIllustrations(data.data);
				setTotalPages(data.totalPages);
			})
			.catch((e) => {
				navigate(Routes.NotFound, { replace: true });
			});
	};

	const loadArtist = (artist: string) => {
		CrawlerService.getArtist(artist).then((a) => {
			if (a.status !== 200 || !a.data) return;
			setTitle(a.data.name);
			setStatus(Status.Done);
		});
	};

	const loadTitle = (title: string) => {
		CrawlerService.getTitle(title).then((t) => {
			if (t.status !== 200 || !t.data) return;
			setTitle(t.data.name);
			setStatus(Status.Done);
		});
	};

	const loadSubject = (subject: string) => {
		CrawlerService.getSubject(subject).then((s) => {
			if (s.status !== 200 || !s.data) return;
			setTitle(s.data.name);
			setStatus(Status.Done);
		});
	};

	const changePage = (page: number) => {
		setStatus(Status.Idle);
		if (page === currentPage || page < 1 || page > totalPages) return;

		const { artist, title, subject } = getSearchParams();

		let query = "";
		if (artist) query = `artist=${artist}`;
		if (title) query = `${query && `${query}&`}title=${title}`;
		if (subject) query = `${query && `${query}&`}subject=${subject}`;
		if (page > 1) query = `${query && `${query}&`}page=${page}`;

		navigate(`${location.pathname}${query && "?"}${query}`);
	};

	const getSearchParams = () => {
		const artist = searchParams.get("artist") ?? undefined;
		const title = searchParams.get("title") ?? undefined;
		const subject = searchParams.get("subject") ?? undefined;
		const page = Number(searchParams.get("page")) ?? 1;
		return { artist, title, subject, page: page <= 0 ? 1 : page };
	};

	const chunkSize = 3;
	const rows = [];
	for (let i = 0; i < illustrations.length; i += chunkSize) {
		const chunk = illustrations.slice(i, i + chunkSize);
		rows.push(
			<Row key={i} className="my-3">
				{chunk.map((data, j) => (
					<Col md="4" key={j}>
						<BookCard
							title={data.title}
							imgSrc={data.image.source}
							subTitle={data.caption}
						/>
					</Col>
				))}
			</Row>
		);
	}

	return status === Status.Pending || status === Status.Idle ? (
		<Container
			className={`d-flex justify-content-center ${illustrationsPageStyles.container}`}
		>
			<Loading />
		</Container>
	) : (
		<Container className={`d-flex justify-content-center flex-column h-75`}>
			<Row>
				<Col>
					<h1 className="text-center">{title}</h1>
				</Col>
			</Row>
			{rows}
			{totalPages > 1 && (
				<Row>
					<PageNavigation
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChanged={(page) => {
							page !== currentPage && changePage(page);
						}}
					/>
				</Row>
			)}
		</Container>
	);
}

function PageNavigation({
	currentPage,
	totalPages,
	onPageChanged,
}: PaginationProps) {
	const paginationItems = [];
	let fisrtPage: number = 1,
		lastPage: number = totalPages >= 5 ? 5 : totalPages;
	if (currentPage > 3 && totalPages > 5) {
		let pageDiff = totalPages - currentPage;
		fisrtPage =
			pageDiff > 2 ? currentPage - 2 : currentPage - 2 - (2 - pageDiff);
		lastPage = pageDiff > 2 ? currentPage + 2 : totalPages;
	}

	for (let i = fisrtPage; i <= lastPage; i++) {
		paginationItems.push(
			<PaginationItem
				active={i === currentPage}
				className={`${i === currentPage ? illustrationsPageStyles.active : ""}`}
				key={i}
			>
				<PaginationLink href="#" onClick={() => onPageChanged(i)}>
					{i}
				</PaginationLink>
			</PaginationItem>
		);
	}
	return (
		<Pagination
			className={`d-flex justify-content-center pt-4 ${illustrationsPageStyles.pagination}`}
		>
			<PaginationItem>
				<PaginationLink first href="#" onClick={() => onPageChanged(1)} />
			</PaginationItem>
			{currentPage > fisrtPage && (
				<PaginationItem>
					<PaginationLink
						href="#"
						previous
						onClick={() =>
							onPageChanged(currentPage > 1 ? currentPage - 1 : currentPage)
						}
					/>
				</PaginationItem>
			)}
			{paginationItems}
			{currentPage < lastPage && (
				<PaginationItem>
					<PaginationLink
						href="#"
						next
						onClick={() =>
							onPageChanged(currentPage < lastPage ? currentPage + 1 : lastPage)
						}
					/>
				</PaginationItem>
			)}
			<PaginationItem>
				<PaginationLink
					href="#"
					last
					onClick={() => onPageChanged(totalPages)}
				/>
			</PaginationItem>
		</Pagination>
	);
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChanged: (page: number) => void;
}
