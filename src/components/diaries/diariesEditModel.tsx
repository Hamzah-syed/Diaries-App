import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
//mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

//validation schema
const schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title length should be less than 50"),
  description: Yup.string().max(
    100,
    "description length should be less than 100"
  ),
  type: Yup.string().required("Kindly select any of the following"),
});

function DiariesEditModel() {
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>

      {open ? (
        <div>
          <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DiariesEditModel;
{
  /* <form>
  <Controller
    as={<TextField />}
    name="title"
    fullWidth
    label="Diary Title"
    size="small"
    color="secondary"
    control={control}
    style={{ background: "white" }}
    //   helperText={errors.title?.message}
    //   error={errors && errors.title && true}
    //   defaultValue=""
  />
</form>; */
}
