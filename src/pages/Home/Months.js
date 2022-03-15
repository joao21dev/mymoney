import React from "react";
import { Link } from "react-router-dom";
import Rest from "../../rest";

const baseURL = "https://mymoney-5d09a-default-rtdb.firebaseio.com/";
const { useGet, usePost, useDelete } = Rest(baseURL);

const Months = () => {
  const data = useGet("months");
  if (data.loading) {
    return <span>Carregando...</span>;
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão de Entrada</th>
            <th>Entrada</th>
            <th>Previsão de Saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.data).map((month) => {
            return (
              <tr key={month}>
                <td>
                  {" "}
                  <Link to={`/transacoes/${month}`}> {month} </Link>{" "}
                </td>
                <td>{data.data[month].forecast_in}</td>
                <td>{data.data[month].in}</td>
                <td>{data.data[month].forecast_out}</td>
                <td>{data.data[month].out}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

export default Months;
