import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import pageNavigationStyles from "./pageNavigation.module.css";

export default function PageNavigation({
	currentPage,
	totalPages,
	onPageChanged,
}: Props) {
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
				className={`${i === currentPage ? pageNavigationStyles.active : ""}`}
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
			className={`d-flex justify-content-center pt-4 ${pageNavigationStyles.pagination}`}
		>
			<PaginationItem
				disabled={currentPage <= fisrtPage}
				className={`${
					currentPage <= fisrtPage ? pageNavigationStyles.disabled : ""
				}`}
			>
				<PaginationLink first href="#" onClick={() => onPageChanged(1)} />
			</PaginationItem>
			<PaginationItem
				disabled={currentPage <= fisrtPage}
				className={`${
					currentPage <= fisrtPage ? pageNavigationStyles.disabled : ""
				}`}
			>
				<PaginationLink
					href="#"
					previous
					onClick={() =>
						onPageChanged(currentPage > 1 ? currentPage - 1 : currentPage)
					}
				/>
			</PaginationItem>
			{paginationItems}
			<PaginationItem
				disabled={currentPage >= lastPage}
				className={`${
					currentPage >= lastPage ? pageNavigationStyles.disabled : ""
				}`}
			>
				<PaginationLink
					href="#"
					next
					onClick={() =>
						onPageChanged(currentPage < lastPage ? currentPage + 1 : lastPage)
					}
				/>
			</PaginationItem>
			<PaginationItem
				disabled={currentPage >= lastPage}
				className={`${
					currentPage >= lastPage ? pageNavigationStyles.disabled : ""
				}`}
			>
				<PaginationLink
					href="#"
					last
					onClick={() => onPageChanged(totalPages)}
				/>
			</PaginationItem>
		</Pagination>
	);
}

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChanged: (page: number) => void;
}
