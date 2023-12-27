/**
 * useTitle - Custom React hook for managing the document title.
 * Updates the document title and restores the previous title when the component unmounts.
 */

import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
