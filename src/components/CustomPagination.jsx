import { Pagination } from "@mui/material";
import React from "react";
import "./CustomPagination.css";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";

const darkTheme = createTheme({
	palette: {
		type: "dark",
	},
});

function CustomPagination({ setPage, numOfPages = 10 }) {
	const handlePageChange = (page) => {
		setPage(page);
		window.scroll(0, 0);
	};
	return (
		<div className='pagination'>
			<ThemeProvider theme={darkTheme}>
				<Pagination
					count={numOfPages}
					onChange={(e) => handlePageChange(e.target.textContent)}
					color='primary'
					hideNextButton
					hidePrevButton
				/>
			</ThemeProvider>
		</div>
	);
}

export default CustomPagination;
