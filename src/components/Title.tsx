import React, { useEffect } from "react";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <></>;
};
