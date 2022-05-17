import { Box, MobileStepper } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

type Props = {
  images: any[];
  isOpenDialog: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

function ImageSwipe({ images, isOpenDialog, openDialog, closeDialog }: Props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const maxSteps = images.length;

  return (
    <>
      <SwipeableViews
        enableMouseEvents
        onChangeIndex={handleStepChange}
        index={activeStep}
        onClick={openDialog}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
                src={step.url}
                alt={step.alternativeText}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "transparent",
          justifyContent: "center",
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={<></>}
        backButton={<></>}
      />
    </>
  );
}

export default ImageSwipe;
