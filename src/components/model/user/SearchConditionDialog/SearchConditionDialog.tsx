import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { useSearchConditionDialog } from "./SearchConditionDialogHooks";

type Props = { open: boolean; setOpen: (isOpen: boolean) => void };

export const SearchConditionDialog = ({ open, setOpen }: Props) => {
  const {
    userId,
    handleChangeUserId,
    userName,
    handleChangeUserName,
    handleSubmit,
    handleCancel,
    handleReset,
    handleClose,
  } = useSearchConditionDialog({ setOpen });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>検索</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="body1">ユーザーID</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                autoFocus
                margin="dense"
                label=""
                fullWidth
                value={userId}
                onChange={handleChangeUserId}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="body1">ユーザー名</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="dense"
                label=""
                fullWidth
                value={userName}
                onChange={handleChangeUserName}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>検索</Button>
          <Button onClick={handleCancel}>キャンセル</Button>
          <Button onClick={handleReset}>リセット</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
