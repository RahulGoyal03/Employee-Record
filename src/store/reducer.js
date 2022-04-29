import {
  FETCH_DATA,
  ADD_EMPLOYEE_DATA,
  DELETE_EMPLOYEE_DATA,
  RESET_ALL_DATA,
  EDIT_EMPLOYEE,
} from "./actionType";

import {loadData,saveData,existingData,deleteFromLS} from "../components/utils/localStorage"
// import { dataChunks } from "../components/utils/chunksdata";
// console.log(dataChunks())

const initial = {
  emp: [],
  data: loadData("employees") || []
 };
 console.log("initial",initial)  

export const reducer = (state = initial, { type, payload }) => {
  
  switch (type) {
 
    case FETCH_DATA: {
      console.log("Fetchpayload",payload)
      saveData("employees", payload)

      return {
        ...state,
        emp: payload,
        data: payload
      };
    }
    

    case ADD_EMPLOYEE_DATA: {
      // existingData("employees", payload)
      return {
        ...state,
        emp: [...state.emp, payload],
        data : existingData("employees", payload)
      };
    }
    case DELETE_EMPLOYEE_DATA: {
     
      // deleteFromLS("employees", payload)
      // console.log("delete", payload);

      // const filteredData = state.data.filter((emp) => emp.id !== payload);
    
      // console.log("filteredData",filteredData)
      return {
        ...state,
        emp: deleteFromLS("employees", payload),
        data: deleteFromLS("employees", payload),
      };
    }

    case EDIT_EMPLOYEE: {
      // console.log("edit", payload); //oldData

      const newData = state.emp.map((emp) => {
        if (emp.id === payload.id) {
          return payload;
        }
        return emp;
      });
    // console.log("data",newData);
      return {
        ...state,
        emp: newData
      };
      
    }

    case RESET_ALL_DATA: {
      // console.log("rahul");
      return initial;
    }

    default: {
      return state;
    }
  }
};
