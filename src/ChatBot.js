import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { fetchGenresData, fetchLLMmodel } from "./components/api";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./ChatBot.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function ChatBot() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [type, setType] = useState("");
  const [genreString, setGenreString] = useState("");
  const [responseData, setResponseData] = useState();

  const setPromptString = () => {
    setGenreString(selectedGenres.join());
  };

  const handleCheckboxChange = (event, name) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, name]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== name));
    }
  };

  const handleDropDownChange = (e) => {
    setType(e.target.value);
  };

  const clearResponse = () => {
    setSelectedGenres([]);
    setResponseData();
  }

  const fetchGenres = async () => {
    const data = await fetchGenresData(type);
    setGenres(data.genres);
  };

  const fetchLLM = async () => {
    if (genreString != "") {
      console.log(genreString);
      const result = await fetchLLMmodel(genreString);
      console.log(result);
      setResponseData(result);
    }
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);

  useEffect(() => {
    fetchLLM();
  }, [genreString]);



  useEffect(() => {
    fetchGenres(type);
    setSelectedGenres([]);
    setResponseData();
  }, [type]);

  return (
    <div className="chatbot_page">
         <ThemeProvider theme={darkTheme} color="secondary">
      <div className="type_dropdown">
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            onChange={handleDropDownChange}
          >
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="tv">TV Shows</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="genre_checkbox">
        {type != "" && (
          <FormGroup row="true">
            {genres &&
              genres.map((genre) => (
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  checked={selectedGenres.includes(genre.name)}
                  onChange={(event) => handleCheckboxChange(event, genre.name)}
                  label={genre.name}
                />
              ))}
          </FormGroup>
        )}
      </div>
      <Button
        onClick={setPromptString}
        variant="contained"
      >
        GO
      </Button>
      <Button
        onClick={clearResponse}
        variant="contained"
      >
        clear
      </Button>
      <div className="response">
        Response:
      {responseData && <div >{responseData}</div>}
      </div>
      </ThemeProvider>
    </div>
  );
}

export default ChatBot;
