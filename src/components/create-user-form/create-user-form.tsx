import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Dialog, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserType, createUserSchema } from "../../validation/user-schema";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { fetchData } from "../../store/data-slice";

const fields = [
  {
    name: "name",
    placeholder: "Фамилия имя отчество",
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
    name: "address",
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
    name: "company",
    placeholder: "Название компании",
  },
];

function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const page = useAppSelector((state: RootState) => state.data.page);

  const [openSnackbar, setOpenSnackbar] = useState<{
    message: string;
    open: boolean;
    severity: "success" | "error";
  }>({
    message: "",
    open: false,
    severity: "success",
  });

  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm<CreateUserType>({
    mode: "onSubmit",
    resolver: zodResolver(createUserSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: CreateUserType) => {
    axios
      .post(`http://localhost:3001/users`, data)
      .then(() => {
        setOpenSnackbar({
          open: true,
          message: "Пользователь успешно создан!",
          severity: "success",
        });
        dispatch(fetchData(page + 1));
        reset();
        handleClose();
      })
      .catch((e) => {
        setOpenSnackbar({
          open: true,
          message: `Ошибк при создание пользователья ${e}`,
          severity: "error",
        });
      });
  };

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
          <p className="text-lg text-right font-bold col-span-2">Добавление пользователья</p>
          {fields.map((field) => {
            const errorMessage =
              errors[field.name as keyof CreateUserType]?.message;

            return (
              <TextField
                key={field.name}
                placeholder={field.placeholder}
                {...register(field.name as unknown as keyof CreateUserType)}
                error={!!errorMessage}
                helperText={errorMessage}
              />
            );
          })}
          <div className="col-span-2 flex justify-end gap-4 ">
            <Button variant="outlined" color="info" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              disabled={!isDirty}
              variant="contained"
              color="success"
              type="submit"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
      >
        <Alert
          onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
          severity={openSnackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateUserForm;
