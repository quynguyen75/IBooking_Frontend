import React from "react";

import { Typography } from "@mui/material";

type Props = {
  content: string;
};

function SectionHeading({ content }: Props) {
  return (
    <Typography
      variant="h3"
      style={{
        color: "#222",
        fontSize: "24px",
        fontWeight: "500",
        marginBottom: "32px",
      }}
    >
      {content}
    </Typography>
  );
}

export default SectionHeading;
