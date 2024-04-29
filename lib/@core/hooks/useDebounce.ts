import { useEffect, useRef } from 'react';

interface DebouncedCallback {
	(...args: any[]): void;
}

const useDebounce = (callback: DebouncedCallback, delay: number): DebouncedCallback => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const debouncedCallback: DebouncedCallback = (...args) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			callback?.(...args);
		}, delay);
	};
	return debouncedCallback;
};

export default useDebounce;
