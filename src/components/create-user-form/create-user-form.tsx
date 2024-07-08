import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateUserType, createUserSchema } from "../../validation/user-schema";

function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<CreateUserType>({
    mode: "onChange",
    resolver: zodResolver(createUserSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-end my-5">
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Success
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form></form>
      </Dialog>
    </div>
  );
}

export default CreateUserForm;
