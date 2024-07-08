export interface IData {
  items: any[];
  status: "idle" | "loading" | "success" | "failed";
  page: number;
}

export interface Item {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
}

export interface IColumns {
  Header: string;
  columns: {
    Header: string;
    accessor: string;
  }[];
}
