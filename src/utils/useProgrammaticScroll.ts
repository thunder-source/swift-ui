import { useRef } from "react";

function useProgrammaticScroll() {
	const ref = useRef(false);
	return ref;
}

export { useProgrammaticScroll };
