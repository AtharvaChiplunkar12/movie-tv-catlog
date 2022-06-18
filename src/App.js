import React from "react";
import "./App.css";
import Header from "./Header";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import TvShow from "./TvShow";
import Anime from "./Anime";
import Page from "./Page";
import { Container } from "@mui/material";

function App() {
	return (
		<>
			<Header />
			<div className='app'>
				<Routes>
					<Route path='/HomePage' element={<HomePage />} />
					<Route path='/Movies' element={<Movies />} />
					<Route path='/TvShow' element={<TvShow />} />
					<Route path='/Anime' element={<Anime />} />
					<Route path='/Page' element={<Page />} />
				</Routes>
			</div>
		</>
	);
}

export default App;