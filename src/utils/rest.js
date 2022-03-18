import { useEffect, useReducer } from "react";
import axios from "axios";
axios.defaults.validateStatus = (code) => code < 500;

const INITIAL_STATE = {
  //estado inicial(data)
  loading: false,
  data: {},
  error: "",
};

const reducer = (state, action) => {
  //reducer é uma pure function, só necessitando de seus params
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }
  if (action.type === "FAILURE") {
    return {
      ...state,
      loading: false,
      error: action.error,
      code: action.code,
    };
  }
  return state;
};

const getAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return "?auth=" + token;
  }
  return "";
};

const init = (baseURL) => {
  console.log(getAuth());
  const useGet = (resource) => {
    //isso serve para reaproveitarmos o  código
    //só usando o useGet para pegar outros dados, só passando uma nova URL
    //sem precisar reescrever a estrutura
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const load = async () => {
      try {
        dispatch({ type: "REQUEST" }); //a primeira acao trás os dados
        const res = await axios.get(baseURL + resource + ".json" + getAuth());
        if (res.data.error && Object.keys(res.data.error).length > 0) {
          dispatch({
            type: "FAILURE",
            error: res.data.error,
            // code: res.data.error.code,
          });
        } else {
          dispatch({ type: "SUCCESS", data: res.data });
        }
      } catch (err) {
        dispatch({ type: "FAILURE", error: "unknow error" });
      }
    };

    useEffect(() => {
      load();
    }, [resource]);
    return {
      ...data,
      refetch: load,
    };
  };

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = async (data) => {
      dispatch({ type: "REQUEST" });
      const res = await axios.post(baseURL + resource + ".json" + getAuth(), data);
      dispatch({ type: "SUCCESS", data: res.data });
    };
    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const remove = async (resource) => {
      dispatch({ type: "REQUEST" });
      await axios.delete(baseURL + resource + ".json" + getAuth());
      dispatch({ type: "SUCCESS" });
    };
    return [data, remove];
  };

  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const patch = async (data) => {
      dispatch({ type: "REQUEST" });
      await axios.patch(baseURL + resource + ".json" + getAuth(), data);
      dispatch({ type: "SUCCESS" });
    };
    return [data, patch];
  };

  return {
    useGet,
    usePost,
    useDelete,
    usePatch,
  };
};

export const usePost = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  const post = async (data) => {
    dispatch({ type: "REQUEST" });
    try {
      const res = await axios.post(resource, data);
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: "FAILURE", error: res.data.error.message });
      } else {
        dispatch({ type: "SUCCESS", data: res.data });
        return res.data;
      }
    } catch (err) {
      dispatch({ type: "FAILURE", error: "unknow error" });
    }
  };
  return [data, post];
};

export default init;
