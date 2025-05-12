type Props = {
	lines: number;
};

const Loading = ({ lines }: Props) => {
	return (
		<div className="p-4 space-y-2">
			{Array.from({ length: lines }).map((_, i) => (
				<div key={i} className="h-4 w-2/3 bg-slate-700 rounded animate-pulse" />
			))}
		</div>
	);
};

export default Loading;
