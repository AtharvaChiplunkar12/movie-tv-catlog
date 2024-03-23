import React from "react";
import { img_300, img_500, unavailable } from "../config";
import { useNavigate } from "react-router-dom";
import GradeIcon from "@mui/icons-material/Grade";
import { Badge } from "@mui/material";
import { DateRangeOutlined, DateRangeRounded } from "@mui/icons-material";
import "./Grid.css";

function Grid({
	id,
	title,
	poster,
	media_type,
	vote_average,
	background_image,
	overview,
	date,
	genre_ids,
}) {
	const navigate = useNavigate();

	const handleNavigate = (
		id,
		title,
		poster,
		media_type,
		vote_average,
		background_image,
		overview,
		date,
		genre_ids,
	) => {
		navigate("/Page", {
			state: {
				id: id,
				title: title,
				poster: poster,
				media_type: media_type,
				score: vote_average,
				background_image: background_image,
				overview: overview,
				date: date,
				genre_ids: genre_ids,
			},
		});
	};
	return (
		<div className='grid'>
			<Badge
				badgeContent={vote_average}
				color={vote_average > 6 ? "primary" : "secondary"}
			/>
			<a
				onClick={() => {
					handleNavigate(
						id,
						title,
						poster,
						media_type,
						vote_average,
						background_image,
						overview,
						date,
						genre_ids,
					);
				}}>
				<span className='poster'>
					<img src={poster ? `${img_300}/${poster}` : unavailable} />
				</span>
				<div className='title'>{title}</div>
				<div className="type_date">
					<div className='media_type'>{media_type}</div>
					<div className='date'>{date}</div>
				</div>
			</a>
		</div>
	);
}

export default Grid;
