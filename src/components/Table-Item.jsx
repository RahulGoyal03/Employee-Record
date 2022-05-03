import React from "react";
import "./Table-Item.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteemployee, chunks } from "../store/action";
import { useNavigate, useParams, Link } from "react-router-dom";
import { dataChunks } from "./utils/chunksdata";
import history from "./utils/history";

// import { useHistory } from "react-router-dom";
// console.log("dataChunks", dataChunks())

// import Pagination from "./Pagination";

const TableItem = () => {
  // let history = useHistory();
  const getQueryParams = (query = null) =>
    (query || window.location.search.replace("?", ""))
      .split("&")
      .map((e) => e.split("=").map(decodeURIComponent))
      .reduce((r, [k, v]) => ((r[k] = v), r), {});

  console.log("query", getQueryParams());

  const dispatch = useDispatch();
  // const { num } = useParams();
  // console.log("param", num);
  const navigate = useNavigate();

  const editForm = (id) => {
    // console.log(id);
    let employDetails = data.pagedata.filter((emp) => emp.id === id);
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

  const data = useSelector((state) => state);
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

  const [pages, setPages] = useState(0);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(0);
  // const [persist, setPersist] = useState(data.pagedata);

  useEffect(() => {
    // setPersist(data.pagedata)
    setPages(getQueryParams().page);
  }, [disable]);
  console.log("pageNum", pages);
  // console.log("persist",persist)

  // dataChunks(limit / 10,limit,limit + 10 )

  // console.log(data.length)
  // console.log(page)
  const number = new Array(Math.ceil(data.data.length / 10)).fill(0);
  // console.log(number)
  // starting limit - limit = offest

  // 0 10 => 10 20

  const nextPage = () => {
    // navigate(`/pg_ ${num}`)
    // console.log("start", start, limit)
    // navigate(`pg_${limit / 10}`);
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", limit / 10);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());

    setStart(limit);
    setLimit(limit + 10);
    setDisable(limit / 10);
    dispatch(chunks(dataChunks(limit / 10, limit, limit + 10)));

    // setPages(pages+1)
    // console.log("rahul")
  };

  // 10 20 => 0 10

  const prevPage = () => {
    // console.log("start", start, limit)
    setStart(start - 10);
    setLimit(start);
    setDisable((start - 10) / 10);
    // setPages(pages-1)
    console.log("start", start - 10);
    console.log("limit", start);
    console.log("page", (start - 10) / 10);
    dispatch(chunks(dataChunks((start - 10) / 10, start - 10, start)));
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", (start - 10) / 10);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());

    setError("");

    // navigate(`/pg_ ${num}`)
  };

  const PageClick = (e, i) => {
    // navigate(`/pg_ ${i+1}`)
    setStart(10 * i);
    setLimit(10 + 10 * i);
    setDisable(i);
    dispatch(chunks(dataChunks(i, 10 * i, 10 + 10 * i)));
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", i);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  };

  useEffect(() => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", disable);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  }, []);
  // navigate(`/pg_/${getQueryParams().page}`);

  return (
    <>
      {/* <Pagination data={data}  pageLimit={10} dataLimit={10}  /> */}

      {/* <Redirect to={`/form/${id}`} /> */}
     
      <button onClick={() => nextPage()} disabled={limit >= data.data.length}>
        Next
      </button>
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
      <button onClick={() => prevPage()} disabled={start <= 0}>
        Prev
      </button>
      <h1>{error}</h1>
      {data.pagedata.map((employ) => (
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
