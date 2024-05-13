import { MouseEvent, RefObject, useCallback, useEffect, useRef } from "react";

const useTableScroll = (scrolling: boolean) => {
    const scrollWrapperRef = useRef<HTMLDivElement | null>(null);

    const btnStartRef = useRef<HTMLButtonElement>(null);
    const btnLeftRef = useRef<HTMLButtonElement>(null);
    const btnRightRef = useRef<HTMLButtonElement>(null);
    const btnEndRef = useRef<HTMLButtonElement>(null);

    const handleScroll = useCallback(
        ({ currentTarget, type }: MouseEvent<HTMLButtonElement>) => {
            const wrapper = scrollWrapperRef.current;

            if (!wrapper || !scrolling) return;

            const button =
                type === "click"
                    ? (currentTarget as HTMLButtonElement)
                    : undefined;

            if (button?.id === "btnStart") scrollStart(btnStartRef, wrapper);
            if (button?.id === "btnLeft") scrollLeft(btnLeftRef, wrapper);
            if (button?.id === "btnRight") scrollRight(btnRightRef, wrapper);
            if (button?.id === "btnEnd") scrollEnd(btnEndRef, wrapper);
        },
        [scrolling]
    );

    const handleKeyDown = useCallback(
        ({ altKey, key }: KeyboardEvent) => {
            const wrapper = scrollWrapperRef.current;

            if (!wrapper || !scrolling) return;

            if (altKey && key === "ArrowLeft") {
                scrollStart(btnStartRef, wrapper);
            }

            if (!altKey && key === "ArrowLeft") {
                scrollLeft(btnLeftRef, wrapper);
            }

            if (!altKey && key === "ArrowRight") {
                scrollRight(btnRightRef, wrapper);
            }

            if (altKey && key === "ArrowRight") {
                scrollEnd(btnEndRef, wrapper);
            }
        },
        [scrolling]
    );

    const handleKeyUp = useCallback(function ({ altKey, key }: KeyboardEvent) {
        if (altKey && key === "ArrowLeft") blurTimeout(btnStartRef);
        if (!altKey && key === "ArrowLeft") blurTimeout(btnLeftRef);
        if (!altKey && key === "ArrowRight") blurTimeout(btnRightRef);
        if (altKey && key === "ArrowRight") blurTimeout(btnEndRef);
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    const btnRefs = {
        btnStartRef,
        btnLeftRef,
        btnRightRef,
        btnEndRef,
    };

    return { scrollWrapperRef, btnRefs, handleScroll };
};

function blurTimeout(btnRef: RefObject<HTMLButtonElement>) {
    setTimeout(() => {
        btnRef.current?.blur();
    }, 100);
}

function scrollStart(
    btnRef: RefObject<HTMLButtonElement>,
    wrapper: HTMLDivElement
) {
    btnRef.current?.focus();
    wrapper.scrollLeft = 0;
}

function scrollLeft(
    btnRef: RefObject<HTMLButtonElement>,
    wrapper: HTMLDivElement
) {
    btnRef.current?.focus();
    const { clientWidth, scrollLeft } = wrapper;
    const scrollNew = scrollLeft - (clientWidth * 3) / 4;
    wrapper.scrollLeft = scrollNew > 0 ? scrollNew : 0;
}

function scrollRight(
    btnRef: RefObject<HTMLButtonElement>,
    wrapper: HTMLDivElement
) {
    btnRef.current?.focus();
    const { clientWidth } = wrapper;
    wrapper.scrollLeft += (clientWidth * 3) / 4;
}

function scrollEnd(
    btnRef: RefObject<HTMLButtonElement>,
    wrapper: HTMLDivElement
) {
    btnRef.current?.focus();
    wrapper.scrollLeft += wrapper.scrollWidth;
}

export { useTableScroll };
