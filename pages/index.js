//imports
import { Inter, Mooli, Roboto, Titillium_Web } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";

// component imports
import Image from "next/image";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });
const titillium = Titillium_Web({ subsets: ["latin"], weight: "600" });

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/page/1"); // Redirect to the first page
	}, [router]);

	return null; // Render nothing
}
