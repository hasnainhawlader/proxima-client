import { createContext, useReducer } from "react";
const initialState = {
  projects: null,
};
export const projecReducer = (state, action) => {
  switch (action.type) {
    case "GET PROJECT":
      return {
        projects: action.payload,
      };
    case "CREATE PROJECT":
      return {
        projects: [action.payload, ...state.projects],
      };
    default:
      return state;
  }
};

export const projectContext = createContext();
export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projecReducer, initialState);
  <projectContext.Provider value={{ ...state, dispatch }}>
    {children}
  </projectContext.Provider>;
};
