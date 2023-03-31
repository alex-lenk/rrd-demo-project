import { useEffect, useState } from "react";
function useHeightReacher(offsetBlurHeight) {
    const [isReached, setIsReached] = useState(
        isHeightReached(offsetBlurHeight)
    );
    function isHeightReached(height) {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return top > height;
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsReached(isHeightReached(offsetBlurHeight));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [offsetBlurHeight]);
    return { isReached };
}

export default useHeightReacher;
