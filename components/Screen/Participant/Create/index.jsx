import { Card, Dialog, DialogContent, Slide } from "@mui/material";
import useIsMobile from "hooks/useIsMobile";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const componentCreates = {
  official: require("./Official").default,
  participant: require("./Participant").default,
};

export default function Create({ open, type, onClose, fetchRows }) {
  const isMobile = useIsMobile();

  const ComponentCreate = componentCreates[type];
  if (!ComponentCreate) return null;

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <ComponentCreate type={type} onClose={onClose} fetchRows={fetchRows} />
    </Dialog>
  );
}
