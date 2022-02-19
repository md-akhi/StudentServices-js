import React from "react";

import LogoImg from "../../data/img/AdminLTELogo.png";

export default(props)=> {
	return (
		<div class="preloader flex-column justify-content-center align-items-center">
			{/* Preloader */}
			<img
				class="animation__shake"
				src={LogoImg}
				alt="AdminLTELogo"
				height="60"
				width="60"
			/>
		</div>
	);
}

