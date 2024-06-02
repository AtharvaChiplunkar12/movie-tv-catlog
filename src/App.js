import React from "react";
import "./App.css";
import Header from "./Header";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import TvShow from "./TvShow";
import Page from "./Page";
import ChatBot from "./ChatBot";

function App() {
	return (
		<>
			<Header />
			<div className='app'>
				<Routes>
					<Route path='/HomePage' element={<HomePage />} />
					<Route path='/Movies' element={<Movies />} />
					<Route path='/TvShow' element={<TvShow />} />
					<Route path='/ChatBot' element={<ChatBot />} />
					<Route path='/Page' element={<Page />} />
				</Routes>
			</div>
		</>
	);
}

export default App;