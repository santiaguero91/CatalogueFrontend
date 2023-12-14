const handleChange = (e, array, setArray) => {
	if (e.target.value) {
		const setValues = new Set([...array, e.target.value]);
		setArray(Array.from(setValues));
	}
};

export default handleChange;

