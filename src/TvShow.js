import React, { useEffect, useState } from "react";
import "./TvShow.css";
import axios from "axios";
import Grid from "./components/Grid";
import CustomPagination from "./components/CustomPagination";
import useGenres from "./components/useGenres";
import Genres from "./components/Genres";

function TvShow() {
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState();
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	const genreforURL = useGenres(selectedGenres);

	const fetchTvShows = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`,
		);
		console.log(data.results);
		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		fetchTvShows();
	}, [page, genreforURL]);

	return (
		<div className='tv_shows'>
			<div className='page_title'>Tv Show</div>
			<div className='filter'>
				<Genres
					type='tv'
					genres={genres}
					setGenres={setGenres}
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					setPage={setPage}
				/>
			</div>
			<div className='tv_grids'>
				{content &&
					content.map((c) => (
						<Grid
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.name}
							vote_average={c.vote_average}
							background_image={c.backdrop_path}
							overview={c.overview}
							date={c.first_air_date}
							media_type='tv'
						/>
					))}
			</div>
			<div>
				<CustomPagination setPage={setPage} numOfPages= {numOfPages} />
			</div>
		</div>
	);
}

export default TvShow;
