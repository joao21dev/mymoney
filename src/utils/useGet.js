import axios from "axios";
import { useEffect, useReducer } from "react";


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

const useGet = (url) => {
  //isso serve para reaproveitarmos o  código
  //só usando o useGet para pegar outros dados, só passando uma nova URL
  //sem precisar reescrever a estrutura
  const [data, dispatch] = useReducer(reducer, {
    //estado inicial(data)
    loading: true,
    data: {},
  });

  useEffect(() => {
    dispatch({ type: "REQUEST" }); //a primeira acao trás os dados
    axios.get(url).then((res) => {
      //a segunda acao deu certo e define a nova data
      dispatch({ type: "SUCCESS", data: res.data });
    });
  }, []);
  return data;
};

export default useGet;
