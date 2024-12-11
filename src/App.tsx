import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [cep, setCep] = useState<string>("");
  const [resultado, setResultado] = useState<string | null>(null);

  const consultarCEP = async () => {
    const cepFormatado = cep.replace("-", "");
    if (!/^\d{8}$/.test(cepFormatado)) {
      alert("CEP inválido! Use o formato 00000000 ou 00000-000.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP inexistente!");
        return;
      }

      setResultado(`Logradouro: ${data.logradouro}, Bairro: ${data.bairro}, Cidade: ${data.localidade} - ${data.uf}`);
    } catch (error) {
      alert("Erro ao consultar CEP.");
    }
  };

  return (
    <div className="container">
      <h1>Consultar CEP</h1>
      <div className="input-group">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP (8 dígitos)"
          maxLength={9}
        />
        <button onClick={consultarCEP}>Buscar</button>
      </div>
      {resultado && <p>{resultado}</p>}
    </div>
  );
};

export default App;
