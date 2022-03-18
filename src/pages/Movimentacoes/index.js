import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMovimentacaoApi } from "../../api";
import AdicionarMovimentacao from "./AdicionarMovimentacao";
import InfoMes from "./InfoMes";

const Movimentacoes = ({ match }) => {
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } =
    useMovimentacaoApi(match.params.data);

  const salvarMovimentacao = async (dados) => {
    await salvarNovaMovimentacao(dados);
    movimentacoes.refetch();
    await sleep(1000);
    // infoMes.refetch();
  };
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const removeMovimentacaoClick = async (id) => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
    movimentacoes.refetch();
    await sleep(1000);
    return window.location.reload();
  };

  if (movimentacoes.error && movimentacoes.error === "Permission denied") {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <h1>Movimentacoes</h1>
      <InfoMes data={match.params.data} />

      <table className="table">
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{movimentacoes.data[movimentacao].descricao}</td>
                  <td>{movimentacoes.data[movimentacao].valor} </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeMovimentacaoClick(movimentacao)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          <AdicionarMovimentacao
            infoMes={InfoMes}
            salvarNovaMovimentacao={salvarMovimentacao}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Movimentacoes;
