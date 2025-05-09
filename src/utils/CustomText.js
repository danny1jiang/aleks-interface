export function CustomText({type, color, children, fontSize}) {
	let className = "text-white ";
	if (color) {
		className = "text-" + color;
	}
	if (fontSize) {
		className += " text-[" + fontSize + "rem]";
	}
	if (type === "medium") {
		className += " text-md";
	}
	return <p className={className}>{children}</p>;
}
