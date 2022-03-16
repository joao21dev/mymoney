const functions = require("firebase-functions"); //salva os trem no database
const admin = require("firebase-admin"); //acesso ao real time database

admin.initializeApp();

//toda vez que fizermos alteracoes nesse caminho, algo acontece
//devReact semana 3 aula 12 explica tudo isso (reassistir de vez em sempreya)
exports.soma = functions.database
  .ref("/movimentacoes/{dia}")
  .onWrite(async (change, context) => {
    const mesesRef = admin.database().ref("/meses/" + context.params.dia);
    const movimentacoesRef = change.after.ref;
    const movimentacoesSS = await movimentacoesRef.once("value");
    const movimentacoes = movimentacoesSS.val();

    let entradas = 0;
    let saidas = 0;

    Object.keys(movimentacoes).forEach((m) => {
      if (movimentacoes[m].valor > 0) {
        entradas += movimentacoes[m].valor;
      } else {
        saidas += movimentacoes[m].valor;
      }
    });

    return mesesRef.transaction((current) => {
    // return mesesRef.movimentacao((current) => {
      if (current === null) {
        return {
          entradas,
          saidas,
          previsao_entrada: 0,
          previsao_saida: 0,
        };
      }
      return {
        ...current,
        entradas,
        saidas,
      };
    });
  });
