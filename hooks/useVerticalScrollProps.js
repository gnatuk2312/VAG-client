import { useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";

const useVerticalScrollProps = () => {
	const [scrollY, setScrollY] = useState(0);
	const [isScrollUp, setIsScrollUp] = useState(true);
	const DEBOUNCE_TIME = 50;
	// adding FASTER_SCROLL to window.pageYOffset makes
	// if (scrollY > window.pageYOffset) statement NOT becoming TRUE when scrolling is slow
	const FASTER_SCROLL = 30;

	const handleNavigation = debounce(() => {
		if (scrollY > (window.pageYOffset || window.scrollY) + FASTER_SCROLL) {
			setIsScrollUp(true);
		} else if (scrollY < (window.pageYOffset || window.scrollY)) {
			setIsScrollUp(false);
		}
		setScrollY(window.pageYOffset || window.scrollY);
	}, DEBOUNCE_TIME);

	useEffect(() => {
		setScrollY(window.scrollY);
		window.addEventListener("scroll", handleNavigation);

		return () => {
			window.removeEventListener("scroll", handleNavigation);
		};
	}, [handleNavigation]);

	const isScrolled = scrollY > 50;

	return {
		isScrollUp,
		isScrolled,
	};
};

export default useVerticalScrollProps;
