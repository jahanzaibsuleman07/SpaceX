import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Details from "@/components/Details";
import Pagination from "@/components/Pagination";
import ErrorMessage from "@/components/ErrorMessage";
import { getLaunches } from "@/services/launches";

export default function PaginatedPage() {
  const router = useRouter();
  const { page } = router.query;
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const launchesPerPage = 9;

  useEffect(() => {
    const fetchLaunches = async () => {
      const { data, error } = await getLaunches();
      if (error) {
        setError(error);
      } else {
        setApiData(data);
      }
    };

    fetchLaunches();
  }, []);

  if (!page || isNaN(page)) return null; // Wait for the page query to load
  if (error) return <ErrorMessage message={error} />;

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
                <Details data={launch} />
              </article>
            );
          })}
        </section>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
}
