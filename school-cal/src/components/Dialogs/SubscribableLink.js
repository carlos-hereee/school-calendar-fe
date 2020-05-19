import React from "react"
import copy from "copy-to-clipboard"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "row",
  },
  linkDisplay: {},
  copyButton: {},
}))
const SubscribableLink = ({ open, link, handleClose }) => {
  const classes = useStyles()
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Subscribable link</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            defaultValue={link}
            margin="normal"
            InputProps={{ readOnly: true }}
            className={classes.linkDisplay}
            multiline
            fullWidth
            rows="3">
            Hello
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small">
            Close
          </Button>
          <Button onClick={() => copy(link)} size="small">
            Copy link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SubscribableLink
