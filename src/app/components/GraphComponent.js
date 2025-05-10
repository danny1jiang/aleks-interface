import {CustomText} from "@/utils/CustomText";
import {
	ChevronsLeftRightEllipsis,
	ChevronUp,
	Eraser,
	Move3D,
	MoveDiagonal,
	PaintBucket,
	Pencil,
	RotateCcw,
	X,
} from "lucide-react";
import {memo, useEffect, useLayoutEffect, useState} from "react";

const cellSide = 5; // Size of each cell in pixels
const maxStackSize = 10; // Maximum stack size of cell update stack

export function GraphComponent() {
	const [tool, setTool] = useState(null);
	const [selectedStack, setSelectedStack] = useState([]);
	const [cells, setCells] = useState([]);
	const [horizontalMarks, setHorizontalMarks] = useState([]);
	const [verticalMarks, setVerticalMarks] = useState([]);

	function handleUndo() {
		if (selectedStack.length > 0) {
			if (selectedStack.length === 1) {
				if (selectedStack[0].length > 1) return;
			}
			setSelectedStack((prev) => [...prev.slice(0, prev.length - 1)]);
		}
	}

	function handleDelete() {
		handleStackUpdate(selectedStack, setSelectedStack, []);
	}

	useLayoutEffect(() => {
		const cells = [];
		const horizontalMarks = [];
		const verticalMarks = [];
		for (let i = 0; i < 18; i++) {
			for (let j = 0; j < 18; j++) {
				cells.push(<Cell key={i + " " + j} x={j - 4} y={14 - i} />);
			}
		}

		for (let i = 1; i < 18; i++) {
			horizontalMarks.push(<GraphMark key={i} index={i - 4} isHorizontal={true} />);
		}

		for (let i = 1; i < 18; i++) {
			verticalMarks.push(<GraphMark key={i} index={14 - i} isHorizontal={false} />);
		}
		setCells(cells);
		setHorizontalMarks(horizontalMarks);
		setVerticalMarks(verticalMarks);
	}, []);

	return (
		<div className="flex flex-row items-start">
			{/* 18 x 18 grid, 4 grids negative and 14 grids positive */}
			{/*<div className="w-90 h-90 border-2 border-black"></div>*/}
			<div className="flex flex-col justify-center items-center">
				<GridClickOverlay
					tool={tool}
					selectedStack={selectedStack}
					setSelectedStack={setSelectedStack}
				/>
				<GridComponent
					horizontalMarks={horizontalMarks}
					verticalMarks={verticalMarks}
					cells={cells}
				/>
			</div>
			<div className="relative ml-5 p-2 flex flex-col shadow-lg rounded-lg border-2 border-[#adadad]">
				<div className="grid grid-cols-3 grid-rows-2 gap-2">
					<GraphButton
						isSelected={tool === "eraser"}
						onClick={() => {
							setTool("eraser");
						}}
					>
						<Eraser size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
					<GraphButton
						isSelected={tool === "pencil"}
						onClick={() => {
							setTool("pencil");
						}}
					>
						<Pencil size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
					<GraphButton onClick={handleClick}>
						<MoveDiagonal size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
					<GraphButton onClick={handleClick}>
						<PaintBucket size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
					<GraphButton onClick={handleClick}>
						<ChevronsLeftRightEllipsis size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
					<GraphButton onClick={handleClick}>
						<Move3D size={30} strokeWidth={1.5} color="#006070" />
					</GraphButton>
				</div>
				<div className="mt-2 flex flex-row justify-stretch items-center gap-2">
					<button
						onClick={handleDelete}
						className="cursor-pointer flex-1 flex flex-col items-center justify-center bg-(--color-secondary) rounded-md h-15"
					>
						<X size={25} strokeWidth={2} color="white" />
					</button>
					<button
						onClick={handleUndo}
						className="cursor-pointer flex-1 flex flex-col items-center justify-center bg-(--color-secondary) rounded-md h-15"
					>
						<RotateCcw size={20} strokeWidth={2.5} color="white" />
					</button>
				</div>
			</div>
		</div>
	);
}

function handleClick() {
	alert("Button Clicked");
}

function handleStackUpdate(selectedStack, setSelectedStack, newPosList) {
	if (selectedStack.length >= maxStackSize) {
		setSelectedStack((prev) => [...prev.slice(1), newPosList]);
	} else {
		setSelectedStack((prev) => [...prev, newPosList]);
	}
}

const GridComponent = memo(function GridComponent({horizontalMarks, verticalMarks, cells}) {
	return (
		<div className="relative grid grid-cols-18 grid-rows-18 border-2 border-black select-none">
			<div
				className={"absolute flex flex-row justify-center"}
				style={{width: "100%", bottom: cellSide * 12 + 4 + "px"}}
			>
				{horizontalMarks}
			</div>
			<div
				className={"absolute flex flex-col justify-center"}
				style={{height: "100%", left: cellSide * 16 - 4 + "px"}}
			>
				{verticalMarks}
			</div>
			{cells}
		</div>
	);
});

function GridClickOverlay({tool, selectedStack, setSelectedStack}) {
	const cells = [];
	for (let i = 0; i < 19; i++) {
		for (let j = 0; j < 19; j++) {
			cells.push(
				<CellClickOverlay
					tool={tool}
					selectedStack={selectedStack}
					setSelectedStack={setSelectedStack}
					key={i + " " + j}
					x={j - 4}
					y={14 - i}
				/>
			);
		}
	}

	return <div className="absolute grid grid-cols-19 grid-rows-19 z-1">{cells}</div>;
}

function CellClickOverlay({tool, selectedStack, setSelectedStack, x, y}) {
	let dotColor = "rgba(0,0,0,0)";

	let currPosList = [];
	if (selectedStack.length > 0) {
		currPosList = selectedStack[selectedStack.length - 1];
		for (let i = 0; i < currPosList.length; i++) {
			if (currPosList[i].x === x && currPosList[i].y === y) {
				dotColor = "black";
				break;
			}
		}
	}

	return (
		<div
			className={
				"w-" +
				cellSide +
				" h-" +
				cellSide +
				" flex flex-col items-center justify-center cursor-pointer"
			}
			onMouseUp={() => {
				if (
					tool === "eraser" &&
					currPosList.find((element) => element.x === x && element.y === y)
				) {
					handleStackUpdate(
						selectedStack,
						setSelectedStack,
						currPosList.filter((pos) => pos.x !== x || pos.y !== y)
					);
				} else if (tool === "pencil") {
					handleStackUpdate(selectedStack, setSelectedStack, [
						...currPosList,
						{x: x, y: y},
					]);
				}
			}}
		>
			<div className="w-1/3 h-1/3 rounded-full" style={{backgroundColor: dotColor}} />
		</div>
	);
}

function GraphButton({children, onClick, isSelected}) {
	const selectedClass = isSelected ? "border-3 border-[#3bacc0]" : "border-none";
	return (
		<button
			className={
				selectedClass +
				" hover:bg-[#d1e8ec] hover:border-3 hover:border-[#3bacc0] cursor-pointer flex flex-row items-center justify-center w-15 h-12 rounded-md "
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function GraphMark({index, isHorizontal}) {
	const value = index * 20;
	if (value === 0) {
		return <div className={"w-5 h-5"} />;
	}

	if (isHorizontal) {
		return (
			<div className={"relative flex flex-col items-center h-5 w-5"}>
				<div className={"border-1 border-[#777777] h-2"} />
				<div className={"absolute top-2"}>
					<CustomText type={"small"} color={"black"}>
						{value}
					</CustomText>
				</div>
			</div>
		);
	} else {
		return (
			<div className={"relative flex flex-row items-center h-5 w-5"}>
				<div className={"absolute left-2"}>
					<CustomText type={"small"} color={"black"}>
						{value}
					</CustomText>
				</div>
				<div className={"border-1 border-[#777777] w-2"} />
			</div>
		);
	}
}

function Cell({x, y}) {
	let axisClass = "";
	if (x === 0) {
		axisClass += " border-l-[#000000]";
	}
	if (y === 0) {
		axisClass += " border-t-[#000000]";
	}
	return (
		<div
			className={
				"w-" + cellSide + " h-" + cellSide + " border-1 border-[#cdcdcd]" + axisClass
			}
		></div>
	);
}
