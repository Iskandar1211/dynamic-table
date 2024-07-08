import React from "react";
import "./App.css";
import CreateUserForm from "./components/create-user-form/create-user-form";
import { InfiniteLoaderTable } from "./components/infiniti-loader-table/infiniti-loader-table";

function App() {
  return (
    <div className="container mx-auto">
      <CreateUserForm />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center ">
          Список пользователей
        </h1>
        <InfiniteLoaderTable />
      </div>
    </div>
  );
}

export default App;
