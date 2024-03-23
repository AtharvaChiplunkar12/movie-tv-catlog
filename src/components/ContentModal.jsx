import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Search from "./Search";
import "./ContentModal.css";
import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "90%",
		height: "80%",
		backgroundColor: "#39445a",
		border: "1px solid #282c34",
		borderRadius: 10,
		color: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 3),
	},
}));

export default function ContentModal({ children }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const classes = useStyles();

	return (
		<div>
			<Button onClick={handleOpen}>{children}</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				className={classes.modal}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<Search />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
