import {
  FETCH_DATA,
  ADD_EMPLOYEE_DATA,
  DELETE_EMPLOYEE_DATA,
  RESET_ALL_DATA,
  EDIT_EMPLOYEE,
} from "./actionType";


const initial = {
  emp: [] };

export const reducer = (state = initial, { type, payload }) => {
  // console.log(type,payload)
  switch (type) {
    case FETCH_DATA: {
      return {
        ...state,
        emp: payload,
      };
    }
    case ADD_EMPLOYEE_DATA: {
      return {
        ...state,
        emp: [...state.emp, payload],
      };
    }
    case DELETE_EMPLOYEE_DATA: {
      // console.log("delete", payload);
      const filteredData = state.emp.filter((emp) => emp.id !== payload);
      return {
        ...state,
        emp: filteredData,
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
    console.log("data",newData);
      return {
        ...state,
        emp: newData,
      };
      
    }

    case RESET_ALL_DATA: {
      console.log("rahul");
      return initial;
    }

    default: {
      return state;
    }
  }
};
