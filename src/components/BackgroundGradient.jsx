import React from "react";
const BackgroundGradiend = () => {
	return (
		<div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
			<div className="w-[108rem] flex-none flex justify-end">
				<picture>
					<source
						srcSet="https://tailwindcss.com/_next/static/media/docs@30.beeb08605f12f699c5abc3814763b65e.avif"
						type="image/avif"
					/>
					<img
						src="https://tailwindcss.com/_next/static/media/docs@tinypng.61f4d3334a6d245fc2297517c87ae044.png"
						alt=""
						className="w-[71.75rem] flex-none max-w-none dark:hidden"
					/>
				</picture>
				<picture>
					<source
						srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.77f062b5fd90f0d2cd4752cd9a8649c8.avif"
						type="image/avif"
					/>
					<img
						src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.a8984b7fb44a4f8232d04de50220ab31.png"
						alt=""
						className="w-[90rem] flex-none max-w-none hidden dark:block"
					/>
				</picture>
			</div>
		</div>
	);
};

export default BackgroundGradiend;
