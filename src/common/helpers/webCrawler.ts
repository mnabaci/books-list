import axios from "axios";

export const crawl = async () => {
	let result = await axios.get("https://www.oldbookillustrations.com", {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});

	console.log(result.data);
};
