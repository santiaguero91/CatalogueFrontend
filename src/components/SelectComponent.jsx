const SelectComponent = ({id, value ,options, handleChange, label}) => {
	return (
		<div className="w-full">
			<label className="text-md text-gray-400 font-bold">{label}</label>
			<select
				name={id}
				id={id}
				onChange={(e) => handleChange(e)}
				value={value}
				defaultValue={""}
				className="border border-black w-full"
			>
				<option value="" selected>
					
				</option>
				{options ? options?.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				)) : "no data"}
			</select>
		</div>
	);
};

export default SelectComponent;
