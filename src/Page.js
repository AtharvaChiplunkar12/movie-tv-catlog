import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Page.css";
import { img_300, img_500, unavailable } from "../src/config";
import axios from "axios";
import Grid from "./components/Grid";
import CastSlider from "./components/CastSlider";
import { Button } from "@mui/material";
import { YouTube } from "@mui/icons-material";
import AliceCarousel from "react-alice-carousel";

function Page() {
	const location = useLocation();
	const poster = location.state.poster;
	const background_image = location.state.background_image;
	const genre_ids = location.state.genre_ids;
	const media_type = location.state.media_type;
	const id = location.state.id;
	const [content, setContent] = useState([]);
	const [credit, setCredit] = useState();
	const [video, setVideo] = useState();

	const fetchRecommender = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US&page=1`,
			);
			setContent(data.results);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(content);
	const fetchCast = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/credits?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US`,
			);

			setCredit(data.cast);
			console.log(data.cast);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(credit);

	const fetchVideo = async () => {
		try {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US`,
		);

		setVideo(data.results[0].key);
	}catch (error) {
		console.error(error);
	}
};

	useEffect(() => {
		fetchRecommender();
		fetchCast();
		fetchVideo();
	}, [id]);

	return (
		<div className='page'>
			<div
				className='background_image'
				style={{
					backgroundImage: `url(${
						background_image ? `${img_500}/${background_image}` : unavailable
					})`,
				}}></div>
			<div className='content'>
				<div className='poster_and_info'>
					<div className='poster_and_button'>
						<img
							className='poster'
							src={poster ? `${img_300}/${poster}` : unavailable}
						/>
						<Button
							variant='contained'
							color='secondary'
							target='_blank'
							startIcon={<YouTube />}
							href={`https://www.youtube.com/watch?v=${video}`}>
							Trailer
						</Button>
					</div>
					<div className='info'>
						<div className='title'>{location.state.title}</div>
						<div className='overview'>{location.state.overview}</div>
						<div>Release Date: {location.state.date}</div>
						<div>Type: {media_type}</div>
						<div className='score'>Rating : {location.state.score}</div>
					</div>
				</div>
				<CastSlider slides={credit} />
			</div>

			<div className='recommender'>
				{content &&
					content.map((c) => (
						<Grid
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							media_type={media_type}
							vote_average={c.vote_average}
							background_image={c.backdrop_path}
							overview={c.overview}
							date={c.release_date || c.first_air_date}
						/>
					))}
			</div>
		</div>
	);
}

export default Page;
/*
				
				*/
