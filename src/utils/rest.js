import { useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  //estado inicial(data)
  loading: false,
  data: {},
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
  return state;
};

const init = (baseURL) => {
  const useGet = (resource) => {
    //isso serve para reaproveitarmos o  código
    //só usando o useGet para pegar outros dados, só passando uma nova URL
    //sem precisar reescrever a estrutura
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const load = async () => {
      dispatch({ type: "REQUEST" }); //a primeira acao trás os dados
      const res = await axios.get(baseURL + resource + ".json");
      //a segunda acao deu certo e define a nova data
      dispatch({ type: "SUCCESS", data: res.data });
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
      const res = await axios.post(baseURL + resource + ".json", data);
      dispatch({ type: "SUCCESS", data: res.data });
    };
    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const remove = async (resource) => {
      dispatch({ type: "REQUEST" });
      await axios.delete(baseURL + resource + ".json");
      dispatch({ type: "SUCCESS" });
    };
    return [data, remove];
  };

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const patch = async (resource, data) => {
      dispatch({ type: "REQUEST" });
      await axios.patch(baseURL + resource + ".json", data);
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

export default init;
