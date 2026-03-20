// Photography website
// Started on July 2020
// By Arnaud De Baerdemaeker

const MainTitle = ({mainTitleClass, children}) => {
	return (
		<h1 className={mainTitleClass}>
			{children}
		</h1>
	);
}

export default MainTitle;
