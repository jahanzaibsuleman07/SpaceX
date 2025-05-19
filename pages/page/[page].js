import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function PaginatedPage() {
	const router = useRouter();
	const { page } = router.query; // Get the current page from the URL
	const [apiData, setApiData] = useState([]);
	const launchesPerPage = 10;

	useEffect(() => {
		const queryOptions = {
			select: "id name date_utc success upcoming details failures links",
			sort: "date_utc",
			limit: 150,
		};

		const getLaunchData = async () => {
			try {
				const url = "https://api.spacexdata.com/v5/launches/query";
				const response = await axios.post(url, {
					options: queryOptions,
				});
				setApiData(response.data.docs);
			} catch (error) {
				console.error(error);
			}
		};

		getLaunchData();
	}, []);

	if (!page || isNaN(page)) return null; // Wait for the page query to load

	const currentPage = parseInt(page, 10);
	const indexOfLastLaunch = currentPage * launchesPerPage;
	const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
	const currentLaunches = apiData.slice(indexOfFirstLaunch, indexOfLastLaunch);

	const totalPages = Math.ceil(apiData.length / launchesPerPage);

	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= totalPages) {
			router.push(`/page/${newPage}`);
		}
	};

	return (
		<>
			<Head>
				<title>SpaceX Launch Tracker - Page {currentPage}</title>
				<meta name="description" content="SpaceX Launch Tracker" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className={`${styles.header}`}>
				<h1 className={styles.header__title}>SpaceX Launch Tracker</h1>
			</header>
			<main className={`${styles.main}`}>
				<section role="card-container" className={styles.main__section}>
					{currentLaunches.map((launch) => {
						const formattedDate = (date) =>
							date.slice(0, 10).split("-").reverse().join("-");
						const status = launch.success ? "success" : "failure";

						return (
							<article key={launch.id} className={styles.launch_card}>
								<Image
									className={styles.img}
									src={launch.links.patch.small}
									alt="Rocket Patch"
									width={200}
									height={200}
								/>
								<h2>{launch.name}</h2>
								<div className={styles.card__content}>
									<p>Date: {formattedDate(launch.date_utc)}</p>
									<p>Launch Status: {status}</p>
									<p>{launch.details}</p>
									{!launch.success && (
										<p>Failure Reason: {launch.failures[0]?.reason}</p>
									)}
								</div>
							</article>
						);
					})}
				</section>
				<div className={styles.pagination}>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={styles.pagination__button}
					>
						Previous
					</button>
                        { totalPages - currentPage < 1 && currentPage - 4 > 0 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage - 4)}>{currentPage - 4}</button> }
                        { totalPages - currentPage < 2 && currentPage - 3 > 0 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage - 3)}>{currentPage - 3}</button> }
                        { totalPages && currentPage - 2 > 0 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage - 2)}>{currentPage - 2}</button> }
                        { totalPages && currentPage - 1 > 0 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</button> }
                        <button className={`${styles.pagination__button} ${ styles.active }`}>{currentPage}</button>
                        { currentPage + 1 <= totalPages && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</button> }
                        { currentPage + 2 <= totalPages && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage + 2)}>{currentPage + 2}</button> }
                        { currentPage + 3 <= totalPages && currentPage < 3 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage + 3)}>{currentPage + 3}</button> }
                        { currentPage + 4 <= totalPages && currentPage < 2 && <button className={styles.pagination__button} onClick={() => handlePageChange(currentPage + 4)}>{currentPage + 4}</button> }
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={styles.pagination__button}
					>
						Next
					</button>
				</div>
			</main>
		</>
	);
}
