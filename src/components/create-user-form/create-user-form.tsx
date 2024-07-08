import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserType, createUserSchema } from "../../validation/user-schema";

const fields = [
  {
    name: "name",
    placeholder: "Имя",
  },
  {
    name: "username",
    placeholder: "Имя пользователя",
  },
  {
    name: "email",
    placeholder: "Электронная почта",
  },
  {
    name: "address.street",
    placeholder: "Улица",
  },
  {
    name: "phone",
    placeholder: "Телефон",
  },
  {
    name: "website",
    placeholder: "Вебсайт",
  },
  {
    name: "company.name",
    placeholder: "Название компании",
  },
];

function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
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

  const onSubmit = (data: CreateUserType) => {};

  return (
    <div className="flex justify-end my-5">
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Добавить пользователья
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 grid grid-cols-2 gap-4"
        >
          {fields.map((field) => (
            <TextField
              placeholder={field.placeholder}
              {...register(field.name as unknown as keyof CreateUserType)}
              error={!!errors[field.name as keyof CreateUserType]?.message}
              helperText={errors[field.name as keyof CreateUserType]?.message}
            />
          ))}
          <div className="col-span-2 flex justify-end gap-4 ">
            <Button variant="outlined" color="info" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="contained" color="success" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateUserForm;
