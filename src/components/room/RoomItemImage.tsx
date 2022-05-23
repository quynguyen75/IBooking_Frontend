import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import SwipeableView from "react-swipeable-views";
import React from "react";

type Props = {
  images: any[];
};

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

function RoomItemImage({ images }: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");

  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box>
      <SwipeableView>
        {images?.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: min768px ? 200 : 255,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
                src={step.attributes.url}
                alt={step.attributes.name}
              />
            ) : null}
          </div>
        ))}
      </SwipeableView>
    </Box>
  );
}

export default RoomItemImage;
