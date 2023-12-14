import deleteIcon from "../assets/Delete.svg";

const FiltersValues = ({list, label, setArrList}) => {
	const handleDeleteItem = (arr, setArr, item) => {
		const filteredArr = arr.filter((itemArr) => item !== itemArr);
		setArr(filteredArr);
	};

	return (
		<ul className="flex flex-col gap-2">
			{list.length > 0 && <label>{label}</label>}
			{list ? list?.map((item) => {
				return (
					<li key={item?.id}>
						<div
							key={item}
							className="relative w-fit overflow-hidden flex flex-row items-center p-2.5 box-border gap-[10px]
								text-left text-xs text-black font-inter shadow-2xl rounded-md bg-[#073763] shadow-slate-600"
						>
							<div className="relative inline-block min-w-[150px] max-w-[150px] h-[17px] overflow-hidden shrink-0 font-bold text-slate-100">
								{item}
							</div>
							<span
								className="relative cursor-pointer font-bold"
								onClick={() => handleDeleteItem(list, setArrList, item)}
							>
								<img
									id="trashIcon"
									src={deleteIcon}
									style={{ width: "20px", height: "20px" }}
								/>
							</span>
						</div>
					</li>
				);
			}) : ""}
		</ul>
	);
};

export default FiltersValues;
