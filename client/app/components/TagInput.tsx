import { useState } from "react";

interface TagInputProps {
	label: string;
	tag: string[];
	setTag: (tag: string[]) => void;
}

export default function TagInput({ label, tag, setTag }: TagInputProps) {
	const [input, setInput] = useState("");

	const handleAdd = () => {
		const newTag = input.trim();
		if (newTag && !tag.includes(newTag)) {
			setTag([...tag, newTag]);
		}
		setInput("");
	};

	const handleRemove = (tagToRemove: string) => {
		setTag(tag.filter((tag) => tag !== tagToRemove));
	};

	const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAdd();
		}
	};

	return (
		<div className="w-1/2">
			<label className="block mb-1 font-medium">{label}</label>
			<div className="flex space-x-2">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					className="border-[#4a5565] border-[1px] p-2 rounded w-full bg-[#101828] focus:border-[#2b7fff] focus:border-[3px] focus:outline-none"
					placeholder="Type and press Enter"
				/>
			</div>
			<div className="flex flex-wrap mt-2 gap-2">
				{tag.map((tag, i) => (
					<span
						key={tag + i}
						className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded"
					>
						{tag}
						<button
							type="button"
							className="ml-2 text-red-500 hover:text-red-700"
							onClick={() => handleRemove(tag)}
						>
							&times;
						</button>
					</span>
				))}
			</div>
		</div>
	);
}
