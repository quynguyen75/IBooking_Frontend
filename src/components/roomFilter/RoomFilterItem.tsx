import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Props = {
  label: string;
  RenderDialog: React.FC<DialogProps>;
};

function RoomFilterItem({ label, RenderDialog }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  useEffect(() => {
    if (isOpenDialog) {
      document.body.classList.add("disableScroll");
    }

    return () => document.body.classList.remove("disableScroll");
  }, [isOpenDialog]);

  return (
    <div>
      <Chip
        label={label}
        variant="outlined"
        onClick={openDialog}
        sx={{
          fontSize: "15px",
        }}
      />
      <RenderDialog isOpen={isOpenDialog} onClose={closeDialog} />
    </div>
  );
}

export default RoomFilterItem;
