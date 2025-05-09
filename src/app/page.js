"use client";

import {CustomText} from "@/utils/CustomText";
import {BookA, Calculator, ChevronDown, CircleHelp, Mail, Menu} from "lucide-react";
import Image from "next/image";
import {GraphComponent} from "./components/GraphComponent";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 justify-start h-screen">
			<Header />
			<div className="flex flex-row flex-1 items-start justify-start w-full p-3 pl-8">
				<div className="flex flex-col flex-1 items-start justify-start mr-3">
					<CustomText color={"black"}>
						A gardener will use up to 220 square feet for planting flowers and
						vegetables. She wants the area used for vegetables to be at least twice the
						area used for flowers. Let x denote the area (in square feet) used for
						flowers. Let y denote the area (in square feet) used for vegetables. Shade
						the region corresponding to all values of x and y that satisfy these
						requirements.
					</CustomText>
					<div className="w-full mt-7 ml-5">
						<GraphComponent />
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 mt-20">
					<SideBarButton>
						<CircleHelp />
					</SideBarButton>
					<SideBarButton>
						<Calculator />
					</SideBarButton>
					<SideBarButton>
						<BookA />
					</SideBarButton>
					<SideBarButton>
						<Mail />
					</SideBarButton>
				</div>
			</div>
			<Footer />
		</div>
	);
}

function SideBarButton({children}) {
	const sideBarButtonClass = "bg-[#e7e7e7] rounded-full p-1.5 cursor-pointer";
	return (
		<button onClick={handleClick} className={sideBarButtonClass}>
			{children}
		</button>
	);
}

function handleClick() {
	alert("Button Clicked");
}

function Footer() {
	return (
		<div className="flex flex-row justify-start bg-[#e7e7e7] w-full border-t-3 p-3 pl-4 gap-3 border-[#cdcdcd]">
			<button
				onClick={handleClick}
				className="cursor-pointer bg-[#e3e0dd] border border-[#999999] rounded-full p-1 pl-4 pr-4"
			>
				Explanation
			</button>
			<button
				onClick={handleClick}
				className="cursor-pointer bg-(--color-secondary) border border-(--color-secondary) rounded-full text-white p-1 pr-4 pl-4"
			>
				Check
			</button>
		</div>
	);
}

function Header() {
	return (
		<div className="flex flex-col items-start w-full">
			<div className="flex flex-col items-start bg-(--color-primary) pl-4 pr-4 p-3 w-full">
				<div className="flex flex-row justify-between h-full w-full">
					<div className="flex flex-row items-center gap-3">
						<button
							onClick={handleClick}
							className="cursor-pointer bg-(--color-secondary) rounded-full p-1.5"
						>
							<Menu size={30} strokeWidth={2} color="white" />
						</button>
						<div className="flex flex-col items-start">
							<div className="flex flex-row justify-start items-center gap-1">
								<div className="rounded-full aspect-square h-4 bg-[#0099b4] border-3 border-[#9de2ee]" />
								<CustomText>Systems of Equations and Matrices</CustomText>
							</div>
							<CustomText>
								Solving a word problem using a system of linear inequalities:
								Problem ty_
							</CustomText>
						</div>
					</div>
					<div className="flex flex-row items-center gap-15">
						<ProgressBar />
						<button
							onClick={handleClick}
							className="cursor-pointer flex flex-row items-center justify-center p-1 pl-4 pr-3 border border-white rounded-sm gap-1"
						>
							<CustomText>Justin</CustomText>
							<ChevronDown size={20} strokeWidth={4} color="white" />
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-row relative justify-between items-start w-full">
				<button
					onClick={handleClick}
					className="cursor-pointer flex flex-col justify-center items-center ml-3 w-13 h-7 rounded-b-md bg-[#cae9ee]"
				>
					<ChevronDown size={50} strokeWidth={3} color="#006a7c" />
				</button>
				<button
					onClick={handleClick}
					className="cursor-pointer relative flex flex-col justify-center items-center mr-5 pl-2 pr-2 top-2 rounded-full border-2 border-[#cdcdcd]"
				>
					Español
				</button>
			</div>
		</div>
	);
}

function ProgressBar() {
	const length = 5;
	const components = [];

	for (let i = 0; i < length; i++) {
		let rounded = "";
		if (i === 0) {
			rounded = "rounded-l-full";
		}
		if (i === length - 1) {
			rounded = "rounded-r-full";
		}
		components.push(
			<div
				key={i}
				className={
					rounded + " aspect-square h-3 w-10 bg-(--color-primary) border-1 border-white"
				}
			/>
		);
	}

	return (
		<div className="flex flex-row gap-0.5 items-center">
			{components}
			<div className="ml-1">
				<CustomText>0/5</CustomText>
			</div>
		</div>
	);
}
