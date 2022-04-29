import React from "react";
import "./Table-Item.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteemployee } from "../store/action";
import { useNavigate,useParams } from "react-router-dom";

// import Pagination from "./Pagination";

const TableItem = () => {
  const dispatch = useDispatch();
  // const {num} = useParams()
  const navigate = useNavigate();


  const editForm = (id) => {
    // console.log(id);
    let employDetails = data.filter((emp) => emp.id === id);
    // console.log(employDetails);
    // dispatch(editEmployee(id));
    navigate(`/form/${id}`);
  };

  const deleted = (id) => {
    if (window.confirm("Really want to delete this data")) {
      dispatch(deleteemployee(id));
    }
  };
  
  // --------------------------------------------------------------------------------
  // const getLocalData = () =>{
  //   let data = localStorage.getItem("employees")
  //   console.log(data)
  //   if(data){
  //     return JSON.parse((localStorage.getItem("employees")))
  //   }else{
  //     return []
  //   }
  // }

  // const [data,setData] = useState(getLocalData())

  // ------------------------------------------------------------------

  const data = useSelector((state) => state.data);
  // console.log(data)
  console.log("employees", data);

  // useEffect(() => {
  //   if(window.location.reload()){
  //     navigate( `/pg_ ${num}`)
  //   }
  // }, [num]);
  {
    /* ____________________Pagination__________________________ */
  }

  // const [pages,setPages] = useState(1)
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(0);

  // console.log(data.length)
  // console.log(page)
  const number = new Array(Math.ceil(data.length / 10)).fill(0);
  // console.log(number)
  // starting limit - limit = offest

  // 0 10 => 10 20

  const nextPage = () => {
    // navigate(`/pg_ ${num}`)
    // console.log("start", start, limit)
    if (limit < data.length) {
      setStart(limit);
      setLimit(limit + 10);
      setDisable(limit / 10);
      // setPages(pages+1)
      // console.log("rahul")
      setError("");
    } else {
      setError("No More Data Found");
    }
  };

  // 10 20 => 0 10

  const prevPage = () => {
    // console.log("start", start, limit)
    
    if (start > 0) {
      
      setStart(start - 10);
      setLimit(start);
      setDisable((start - 10) / 10);
      // setPages(pages-1)
      setError("");
    } else {
      setError("This is First Page");
    }
    // navigate(`/pg_ ${num}`)
  };

  const PageClick = (e, i) => {
    // navigate(`/pg_ ${i+1}`)
    setStart(10 * i);
    setLimit(10 + 10 * i);
    setDisable(i);
   
  };

  return (
    <>
      {/* <Pagination data={data}  pageLimit={10} dataLimit={10}  /> */}

      {/* <Redirect to={`/form/${id}`} /> */}
      <button onClick={() => nextPage()}> Next</button>
      {number.map((el, i) => (
        <button
          name={i}
          key={i}
          onClick={(e) => PageClick(e, i)}
          disabled={i === disable}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => prevPage()}>Prev</button>
      <h1>{error}</h1>
      {data.slice(start, limit).map((employ) => (
        <div className="main_box" key={employ.id}>
          <div>{employ.id}</div>
          <div>
            {employ.first_name} {employ.last_name}{" "}
          </div>
          <div>{employ.email}</div>
          <div>{employ.sex}</div>
          <div>{employ.designation}</div>
          <div>{employ.phone}</div>

          <div>
            <button className="edited" onClick={() => editForm(employ.id)}>
              Edit/Update
            </button>
            <button className="deleted" onClick={() => deleted(employ.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TableItem;
