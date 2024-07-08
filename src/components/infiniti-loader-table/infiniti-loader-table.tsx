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
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  return <Table columns={columns} data={items} update={loadMoreItems} />;
};
