import {
	Button,
	createTheme,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import CustomPagination from "./CustomPagination";
import Grid from "./Grid";

const Search = () => {
	const [type, setType] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();

	const darkTheme = createTheme({
		palette: {
			type: "dark",
			primary: {
				main: "#fff",
			},
		},
	});

	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${
					type ? "tv" : "movie"
				}?api_key=3b36cd2b0c4e8c4a3ec6742e7d6bf81f&language=en-US&query=${searchText}&page=${page}&include_adult=false`,
			);
			setContent(data.results);
			setNumOfPages(data.total_pages);
			// console.log(data);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(type);
	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line
	}, [type, page]);

	return (
		<div className="ContentModal">
			<ThemeProvider theme={darkTheme}>
				<div>
					<TextField
						style={{ flex: 1 }}
						className='searchBox'
						label='Search'
						variant='filled'
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button
						onClick={fetchSearch}
						variant='contained'
						style={{ marginLeft: 10 }}>
						<SearchIcon fontSize='large' />
					</Button>
				</div>
				<Tabs
					value={type}
					indicatorColor='primary'
					textColor='primary'
					onChange={(event, newValue) => {
						setType(newValue);
						setPage(1);
					}}
					style={{ paddingBottom: 5 }}
					aria-label='disabled tabs example'>
					<Tab style={{ width: "50%" }} label='Search Movies' />
					<Tab style={{ width: "50%" }} label='Search TV Series' />
				</Tabs>
			</ThemeProvider>
			<div className='trending'>
				{content &&
					content.map((c) => (
						<Grid
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? "tv" : "movie"}
							vote_average={c.vote_average}
						/>
					))}
				{searchText &&
					!content &&
					(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Search;
