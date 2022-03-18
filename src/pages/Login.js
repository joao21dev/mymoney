import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { usePost } from "../utils/rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDsoUO4DKjR_5plPvGng_f3PWXTqwu7pmk";

const Login = () => {
  const [postData, signin] = usePost(url);
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem("token", postData.data.idToken);
      // console.log("logou", postData.data.idToken);

      window.location.reload();
    }
  }, [postData]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    }
  });
  const login = async () => {
    await signin({
      email,
      password: senha,
      returnSecureToken: true,
    });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  if (logado) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      

      <div className="container mt-2">
      <h1>Welcome!</h1>
        <input
          type="text"
          value={email}
          onChange={onChangeEmail}
          placeholder="Email"
        />
        <input
          type="password"
          value={senha}
          onChange={onChangeSenha}
          placeholder="Senha"
        />
        <button className="btn btn-success m-1" onClick={login}>
          Login
        </button>
        {postData.error && postData.error.length > 0 && (
          <div className="alert alert-danger mt-3" role="alert" style={{ width: "43.6%" }}>
            E-mail ou Senha inválidos
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
