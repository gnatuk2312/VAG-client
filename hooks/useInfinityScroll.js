const useInfinityScroll = (event, allDataIsFetched, setFetching) => {
	const { scrollHeight, scrollTop, clientHeight } = event.target;

	if (scrollHeight - (scrollTop + clientHeight) < 100 && allDataIsFetched === false)
		setFetching(true);
};

export default useInfinityScroll;
