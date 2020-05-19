import React from "react"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core"

const CancelDialog = ({ open, createClose, handleClose }) => {
  const confirmButtonClick = () => {
    handleClose()
    createClose()
  }
  return (
    <div>
      <Dialog open={open} size="small" fullWidth>
        <DialogTitle>Cancel</DialogTitle>
        <DialogContent>
          <p>This will discard all changes</p>
          <p>Are you sure?</p>
        </DialogContent>
        <DialogActions>
          <Button inverted color="orange" onClick={confirmButtonClick}>
            Confirm
          </Button>
          <Button inverted color="orange" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CancelDialog
