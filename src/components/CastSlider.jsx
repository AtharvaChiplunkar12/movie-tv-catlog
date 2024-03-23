import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, img_500, unavailable } from "../config";
import "./CastSlider.css";

const handleDragStart = (e) => e.preventDefault();

const CastSlider = ({ slides }) => {
	const items =
		slides &&
		slides.map((slide, index) => {
			const { name, profile_path } = slide;
			return (
				<div className='carouselItem'>
					<img
						src={profile_path ? `${img_300}/${profile_path}` : unavailable}
						alt='movies image'
						className='cast_image'
					/>

					<div>{name}</div>
				</div>
			);
		});

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 6,
		},
	};

	return (
		<AliceCarousel
			infinite
			disableDotsControls
			responsive={responsive}
			mouseTracking
			items={items}
		/>
	);
};

export default CastSlider;
