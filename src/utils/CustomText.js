export function CustomText({type, color, children}) {
	let className = "text-white ";
	let style = {
		fontSize: "1rem",
	};
	if (color) {
		className = "text-" + color;
	}
	if (type === "small") {
		style.fontSize = "0.6rem";
	}
	return (
		<p className={className} style={style}>
			{children}
		</p>
	);
}
