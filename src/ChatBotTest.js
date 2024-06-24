import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { fetchGenresData, fetchLLMmodel, fetchLLMmodelTest } from "./components/api";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./ChatBot.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ChatResponseComponent from "./components/ChatResponseComponent";
import Grid from "./components/Grid";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function ChatBotTest() {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleQuery = (e) => {
    setQuery(inputValue);
    setInputValue('');
  }


  const fetchLLM = async () => { 
      const data = await fetchLLMmodelTest(query);
      console.log(data);
      setResponseData(data);
  };

  useEffect(() => {
    if (query != ''){
      fetchLLM();
    }
    
  }, [query]);
//<ChatResponseComponent responseData ={responseData}/>
  return (
    <div className="chatbot_page">
       <input name="myInput" value={inputValue} onChange={handleInputChange}/>
       <Button onClick={handleQuery}>Enter</Button>
       <div className="response">
       <div>
        Question:
        {query && <div>{query}</div>}
        </div>
        <h3>
          Response:
        </h3>
        <div className='movie_grids'>
        {responseData && responseData.map((val)=>{
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
        
        
        
          
      </div>
    </div>
    
  );
}

export default ChatBotTest;
