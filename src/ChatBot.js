import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { fetchGenresData } from './components/api';
import { Chip } from "@mui/material";

function ChatBot () {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const type = 'movie';

    const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g) => g.id !== genre.id));
	};

    const fetchGenres = async () => {
		const data = await fetchGenresData(type);
		setGenres(data.genres);
	};
    useEffect(() => {
		fetchGenres();
		return () => {
			setGenres({});
		};
	}, []);

  return (
    <FormGroup row='true'>
        {genres &&
				genres.map((genre) => (
                    <FormControlLabel control={<Checkbox color="success" />} label={genre.name} />
					
				))}
       
    </FormGroup>
  )
}

export default ChatBot;