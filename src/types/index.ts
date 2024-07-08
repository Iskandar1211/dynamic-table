export interface IData {
  items: any[];
  status: "idle" | "loading" | "success" | "failed";
  page: number;
}
export interface IUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
}

export interface IColumns {
  Header: string;
  accessor: string;
}
