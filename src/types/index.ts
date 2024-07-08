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
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IColumns {
  Header: string;
  accessor: string;
}
