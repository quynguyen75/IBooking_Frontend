import React, { useEffect } from "react";

function useDisableScroll(open: boolean) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("disableScroll");
    }

    return () => document.body.classList.remove("disableScroll");
  }, [open]);
}

export default useDisableScroll;
