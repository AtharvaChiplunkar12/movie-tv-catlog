import React, { useEffect, useState } from "react";
import "./Movies.css";
import Genres from "./components/Genres";
import Grid from "./components/Grid";
import CustomPagination from "./components/CustomPagination";
import useGenres from "./components/useGenres";
import { fetchMoviesData } from './components//api';


function Movies() {
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState();

	const genreforURL = useGenres(selectedGenres);

	const fetchMovies = async () => {
		const data = await fetchMoviesData(page, genreforURL);
		setContent(data.results);
		setNumOfPages(data.total_pages);
		console.log(data.results);
	};

	console.log(genres);

	useEffect(() => {
		fetchMovies();
	}, [page, genreforURL]);

	console.log(selectedGenres);

	return (
		<div className='movies_page'>
			<div className='page_title'>Movies</div>
			<div className='filter'>
				<Genres
					type='movie'
					genres={genres}
					setGenres={setGenres}
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					setPage={setPage}
				/>
			</div>
			<div className='movie_grids'>
				{content &&
					content.map((val) => {
						const {
							id,
							title,
							poster_path,
							vote_average,
							backdrop_path,
							overview,
							release_date,
							genre_ids,
						} = val;
						return (
							<Grid
								key={id}
								id={id}
								poster={poster_path}
								title={title}
								vote_average={vote_average}
								background_image={backdrop_path}
								overview={overview}
								date={release_date}
								genre_ids={genre_ids}
								media_type='movie'
							/>
						);
					})}
			</div>
			<div>
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			</div>
		</div>
	);
}

export default Movies;
