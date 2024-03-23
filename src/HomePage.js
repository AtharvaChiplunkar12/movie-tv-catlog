import React, { useEffect, useState } from "react";
import ImageSlider from "./components/ImageSlider";
import "./HomePage.css";
import axios from "axios";
import Grid from "./components/Grid";
import CustomPagination from "./components/CustomPagination";

function HomePage() {
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState();

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&page=${page}`,
		);
		console.log(data.results);
		setContent(data.results);
	};

	useEffect(() => {
		fetchTrending();
	}, [page]);

	return (
		<div className='home_page'>
			<div className='search_bar'>
				<p>Find Movies, TV shows and more</p>
			</div>
			<div className='page_title'>Trending</div>
			<div className='image_slider'>
				<ImageSlider slides={content} />
			</div>
			<div className='trending'>
				{content &&
					content.map((c) => (
						<Grid
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							media_type={c.media_type}
							vote_average={c.vote_average}
							background_image={c.backdrop_path}
							overview={c.overview}
							date={c.release_date || c.first_air_date}
						/>
					))}
			</div>
			<div>
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			</div>
		</div>
	);
}

export default HomePage;
