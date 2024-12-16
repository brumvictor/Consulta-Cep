import React, { useState } from "react";
import "./App.css";

interface CepData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const App: React.FC = () => {
  const [cep, setCep] = useState<string>("");
  const [resultado, setResultado] = useState<CepData | null>(null);
  const [erro, setErro] = useState<string>("");

  const formatarCep = (valor: string): string => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, "");
    // Aplica a máscara de CEP automaticamente
    return apenasNumeros.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCep(e.target.value);
    setCep(valorFormatado);
  };

  const consultarCEP = async () => {
    const cepFormatado = cep.replace("-", "");
    if (!/^\d{8}$/.test(cepFormatado)) {
      setErro("CEP inválido! Use o formato 00000-000.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
      if (!response.ok) {
        throw new Error("CEP não encontrado!");
      }

      const data = await response.json();
      if (data.erro) {
        throw new Error("CEP inexistente!");
      }

      setResultado(data);
      setErro("");
    } catch (error) {
      setErro((error as Error).message);
      setResultado(null);
    }
  };

  return (
    <div className="container">
      <h1>Consultar CEP</h1>
      <div className="input-group">
        <input
          type="text"
          value={cep}
          onChange={handleChange}
          placeholder="Digite o CEP"
          maxLength={9} // 8 números + 1 hífen
        />
        <button onClick={consultarCEP}>Buscar</button>
      </div>
      {erro && <p className="error">{erro}</p>}
      {resultado && (
        <div className="resultado">
          <p><strong>Logradouro:</strong> {resultado.logradouro}</p>
          <p><strong>Bairro:</strong> {resultado.bairro}</p>
          <p><strong>Cidade:</strong> {resultado.localidade} - {resultado.uf}</p>
        </div>
      )}
    </div>
  );
};

export default App;
