import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";

function Genres({
	genres,
	setGenres,
	selectedGenres,
	setSelectedGenres,
	type,
	setPage,
}) {
	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g) => g.id !== genre.id));
		setPage(1);
	};

	const handleRemove = (genre) => {
		setSelectedGenres(
			selectedGenres.filter((selected) => selected.id !== genre.id),
		);
		setGenres([...genres, genre]);
		setPage(1);
	};

	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US`,
		);

		setGenres(data.genres);
	};

	useEffect(() => {
		fetchGenres();
		return () => {
			setGenres({});
		};
	}, []);

	return (
		<div>
			{selectedGenres &&
				selectedGenres.map((genre) => (
					<Chip
						label={genre.name}
						style={{ margin: 2 }}
						size='small'
						color='primary'
						key={genre.id}
						clickable
						onDelete={() => handleRemove(genre)}
					/>
				))}
			{genres &&
				genres.map((genre) => (
					<Chip
						label={genre.name}
						style={{ margin: 2 }}
						size='small'
						key={genre.id}
						clickable
						onClick={() => handleAdd(genre)}
					/>
				))}
		</div>
	);
}

export default Genres;
