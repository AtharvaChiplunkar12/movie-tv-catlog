import React from "react";
import "./Anime.css";
import FormControlLabelPosition from "./components/ContentModal";
import { Button, TextField, ThemeProvider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Search from "./components/Search";
import ContentModal from "./components/ContentModal";

function Anime() {
	return (
		<div>
			<div className='page_title'></div>
			<ContentModal>
				<Button variant='contained'>
					<SearchIcon color='primary' />
				</Button>
			</ContentModal>
		</div>
	);
}

export default Anime;
