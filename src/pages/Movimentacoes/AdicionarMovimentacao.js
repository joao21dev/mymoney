import React, { useState } from "react";

const AdicionarMovimentacao = ({ salvarNovaMovimentacao, infoMes }) => {
  // gestao de formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [forceRedirect, setForceRedirect] = useState(false);

  const onChangeDescricao = (event) => {
    setDescricao(event.target.value);
    console.log(descricao);
  };

  const onChangeValor = (event) => {
    setValor(event.target.value);
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor),
      });
      setDescricao("");
      setValor("0");
      setForceRedirect("true");
      infoMes.refetch();
    }
  };

  if(forceRedirect) {
    return window.location.reload();
  }

  return (
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
  );
};

export default AdicionarMovimentacao;
