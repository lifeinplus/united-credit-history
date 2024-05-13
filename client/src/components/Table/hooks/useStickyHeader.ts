import { useEffect, useRef } from "react";

export const useStickyHeader = (sticky: boolean) => {
    const tableWrapperRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        const tableWrapper = tableWrapperRef.current;
        const header = headerRef.current;

        if (header && sticky) {
            header.style.removeProperty("transform");

            const translate = () => {
                if (!tableWrapper || !header) {
                    return;
                }

                const scroll = window.pageYOffset;
                const top = tableWrapper.offsetTop;

                if (scroll > top) {
                    const yTranslation = Math.ceil(Math.abs(scroll - top)) - 1;
                    header.style.setProperty(
                        "transform",
                        `translateY(${yTranslation}px)`
                    );
                } else {
                    header.style.removeProperty("transform");
                }
            };

            window.addEventListener("scroll", translate);

            return () => {
                window.removeEventListener("scroll", translate);
                header?.style.removeProperty("transform");
            };
        }

        return () => {
            header?.style.removeProperty("transform");
        };
    }, [sticky]);

    return { tableWrapperRef, headerRef };
};
