import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContentModal from "./components/ContentModal";
import { Button, TextField, ThemeProvider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
	const [searchbar, setSearchBar] = useState(0);
	const [value, setValue] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		setValue(JSON.parse(window.localStorage.getItem("value")));
	}, []);

	useEffect(() => {
		window.localStorage.setItem("value", value);
	}, [value]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		setSearchBar(newValue);
	};

	const ShowSearchBar = () => {
			return (
				<div className='header_search'>
					<ContentModal>
						<Button variant='contained'>
							<SearchIcon color='primary' />
						</Button>
					</ContentModal>
				</div>
			);
	};

	const handleTabChange = (val) => {
		if (val === 0) navigate("/HomePage");
		else if (val === 1) navigate("/Movies");
		else if (val === 2) navigate("/TvShow");
		else if (val === 3) navigate("/Anime");
	};

	function LinkTab(props) {
		return (
			<div className='tab'>
				<Tab
					sx={{
						color: "white",
					}}
					onClick={(event) => {
						event.preventDefault();
					}}
					{...props}
				/>
			</div>
		);
	}

	return (
		<div className='header'>
			<div className='header_left'>
				<h1>Flick List</h1>
			</div>
			{/*logo image*/}

			<div className='header_middle'>
				<Box>
					<Tabs
						selected
						className='tabs'
						value={value}
						searchbar={searchbar}
						onChange={handleChange}
						aria-label='nav tabs example'>
						<LinkTab label='Home' onClick={() => handleTabChange(0)} />
						<LinkTab label='Movies' onClick={() => handleTabChange(1)} />
						<LinkTab label='TV Show' onClick={() => handleTabChange(2)} />
						<LinkTab label='Anime' onClick={() => handleTabChange(3)} />
					</Tabs>
				</Box>
			</div>

			<div className='header_right'>
				<div className='header_input'>
					<ShowSearchBar />
				</div>
				<div className='login_btn'>
					<button>Login</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
