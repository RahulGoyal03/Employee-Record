import "./App.css";
import Table from "./components/Table-Header";
import TableItem from "./components/Table-Item";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fechdata } from "./store/action";
import { employees } from "./store/data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyForm from "./components/Form/Form";
// import  DataShow  from "./components/ShowData"

// console.log(employees)
function App() {
  const data = useSelector((state) => state);
  console.log(data)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fechdata(employees));
  }, []);
  // console.log(data)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Table />
              <TableItem />
            </>
          }
        />
        <Route path="form" element={<MyForm />} />
        <Route path="/form/:id" element={<MyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
