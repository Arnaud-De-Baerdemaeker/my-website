// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const Name = ({nameClass, children}) => {
	return (
		<h1 className={nameClass}>
			{children}
		</h1>
	);
}

export default Name;