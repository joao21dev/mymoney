import React from "react";
import { useMesApi } from "../../api";

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data);

  const alterarPrevisaoEntrada = (event) => {
    alterarMes({
      previsao_entrada: event.target.value,
    });
  };

  const alterarPrevisaoSaida = (event) => {
    alterarMes({
      previsao_saidaa: event.target.value,
    });
  };

  if (infoMes.loading) {
    return <p>Carregando dados do mês</p>;
  }
  if (infoMes.data) {
    return (
      <div>
        Previsao entrada: <span> {infoMes.data.previsao_entrada} </span>
        <br />
        <input type="text" onChange={alterarPrevisaoEntrada} />{" "}
        <button
          className="btn btn-info"
          onClick={() => window.location.reload(false)}
        >
          Salvar
        </button>
        <br />/ Previsao saída: {infoMes.data.previsao_saida} <br />
        <input type="text" onChange={alterarPrevisaoSaida} />{" "}
        <button
          className="btn btn-info"
          onClick={() => window.location.reload(false)}
        >
          Salvar
        </button>
        <br />
        Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
      </div>
    );
  }
  return null;
};

export default InfoMes;
