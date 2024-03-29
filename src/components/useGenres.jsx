import React from "react";

function useGenres(selectedGenres) {
	if (selectedGenres < 1) return "";

	const GenreIds = selectedGenres.map((g) => g.id);
	return (GenreIds.reduce((acc, curr) => acc + ',' + curr));
}

export default useGenres;
