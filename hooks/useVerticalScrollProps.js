import { useCallback, useEffect, useState } from "react";

const useVerticalScrollProps = () => {
	const [scrollY, setScrollY] = useState(0);
	const [isScrollUp, setIsScrollUp] = useState(true);

	const handleNavigation = useCallback(
		(event) => {
			const window = event.currentTarget;
			if (scrollY > window.scrollY) {
				setIsScrollUp(true);
			} else if (scrollY < window.scrollY) {
				setIsScrollUp(false);
			}
			setScrollY(window.scrollY);
		},
		[scrollY],
	);

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
