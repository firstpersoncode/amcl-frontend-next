import { Card, Dialog, DialogContent } from "@mui/material";
import useIsMobile from "hooks/useIsMobile";

const componentDetails = {
  official: require("./Official").default,
  participant: require("./Participant").default,
};

export default function Detail({
  open,
  type,
  onClose,
  fetchRows,
  participant,
}) {
  const isMobile = useIsMobile();

  const ComponentDetail = componentDetails[type];
  if (!ComponentDetail) return null;

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <ComponentDetail
        participant={participant}
        type={type}
        onClose={onClose}
        fetchRows={fetchRows}
      />
    </Dialog>
  );
}
