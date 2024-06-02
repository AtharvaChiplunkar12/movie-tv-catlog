import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
export const fetchMoviesData = async (page, genreforURL) => {
    try {
        console.log(apiKey);
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies data", error);
      throw error;
    }
};

export const fetchTvShowsData = async (page, genreforURL) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`,
    );
      return response.data;
    } catch (error) {
      console.error("Error fetching tv shows data", error);
      throw error;
    }
};

export const fetchGenresData = async (type) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`,
    );
      return response.data;
    } catch (error) {
      console.error("Error fetching Genres data", error);
      throw error;
    }
};

export const fetchLLMmodel = async (genre) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/${genre}/Hindi`,
    );
      return response.data;
    } catch (error) {
      console.error("Error fetching LLM Model", error);
      throw error;
    }
};