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

    useEffect(() => {
      dispatch({ type: "REQUEST" }); //a primeira acao trás os dados
      axios.get(baseURL + resource + ".json").then((res) => {
        //a segunda acao deu certo e define a nova data
        dispatch({ type: "SUCCESS", data: res.data });
      });
    }, []);
    return data;
  };

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = (data) => {
      dispatch({ type: "REQUEST" });
      axios.post(baseURL + resource + ".json", data).then((res) => {
        dispatch({ type: "SUCCESS", data: res.data });
      });
    };
    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const remove = (resource) => {
      dispatch({ type: "REQUEST" });
      axios.delete(baseURL + resource + ".json").then(() => {
        dispatch({ type: "SUCCESS" });
      });
    };
    return [data, remove];
  };

  return {
    useGet,
    usePost,
    useDelete,
  };
};

export default init;
