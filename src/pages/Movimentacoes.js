import React, { useState } from "react";
import Rest from "../utils/rest";

const baseURL = "https://mymoney-5d09a-default-rtdb.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  //assistir aula 08 pra consertar minhas-series
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);
  const [dataPatch, patch] = usePatch();
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remove] = useDelete();
  //esse movimentacoes não é o transacoes do link, e sim o nome que tá no DB
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onChangeDescricao = (event) => {
    setDescricao(event.target.value);
    console.log(descricao);
  };

  const onChangeValor = (event) => {
    setValor(event.target.value);
  };
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        //descricao: descricao
        valor: parseFloat(valor),
        //valor: valor
      });
      setDescricao("");
      setValor("0");
      data.refetch();
      await sleep(5000);
      dataMeses.refetch();
    }
  };

  const removeMovimentacao = async (id) => {
    await remove(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
  };

  const alterarPrevisaoEntrada = (event) => {
    patch(`meses/${match.params.data}`, {
      previsao_entrada: event.target.value,
    });
  };

  const alterarPrevisaoSaida = (event) => {
    patch(`meses/${match.params.data}`, {
      previsao_saidaa: event.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Movimentacoes</h1>
      {!dataMeses.loading && dataMeses.data && (
        <div>
          Previsao entrada:{" "}
           <span> {dataMeses.data.previsao_entrada} </span>
          <br />
          <input type="text" onChange={alterarPrevisaoEntrada} />{" "}
          <button
            className="btn btn-info"
            onClick={() => window.location.reload(false)}
          >
            Salvar
          </button>
          <br />/ Previsao saída: {dataMeses.data.previsao_saida} <br />
          <input type="text" onChange={alterarPrevisaoSaida} />{" "}
          <button
            className="btn btn-info"
            onClick={() => window.location.reload(false)}
          >
            Salvar
          </button>
          <br />
          Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td>{data.data[movimentacao].valor} </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeMovimentacao(movimentacao)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                onChange={onChangeDescricao}
                value={descricao}
                type="text"
              ></input>
            </td>
            <td>
              <input type="text" onChange={onChangeValor} value={valor}></input>
            </td>
            <td>
              <button
                className="btn btn-success"
                type="submit"
                onClick={salvarMovimentacao}
              >
                Adicionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Movimentacoes;
