import React, { useState, useEffect } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { img_300, img_500, unavailable } from "../config";

const ImageSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;
	console.log(length);

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const pervSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};
	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<div className='slider'>
			<NavigateBeforeIcon className='left_arrow' onClick={pervSlide} />
			<NavigateNextIcon className='right_arrow' onClick={nextSlide} />
			{slides.map((slide, index) => {
				const { backdrop_path, title } = slide;
				return (
					<div
						className={index === current ? "slide active" : "slide"}
						key={index}>
						{index === current && (
							<img
								src={
									backdrop_path ? `${img_500}/${backdrop_path}` : unavailable
								}
								alt='movies image'
								className='image'
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ImageSlider;
