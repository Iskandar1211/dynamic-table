import { useEffect, useMemo } from "react";
import { fetchData, incrementPage } from "../../store/data-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Table } from "../table/table.component";

export const InfiniteLoaderTable = () => {
  const dispatch = useAppDispatch();
  const { items, status, page } = useAppSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData(page));
    }
  }, [status, page, dispatch]);

  const loadMoreItems = () => {
    if (status !== "loading") {
      dispatch(incrementPage());
      dispatch(fetchData(page + 1));
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ФИО",
        accessor: "name",
      },
      {
        Header: "Имя пользователья",
        accessor: "username",
      },
      {
        Header: "Почта",
        accessor: "email",
      },
      {
        Header: "Адрес",
        accessor: "address",
      },
      {
        Header: "Телефон",
        accessor: "phone",
      },
      {
        Header: "Сайт",
        accessor: "website",
      },
      {
        Header: "Компания",
        accessor: "company",
      },
    ],

    []
  );

  return <Table columns={columns} data={items} update={loadMoreItems} />;
};
