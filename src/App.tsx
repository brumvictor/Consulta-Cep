import React from "react";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Consultar CEP</h1>
      <div className="input-group">
        <input type="text" placeholder="Digite o CEP (8 dígitos)" maxLength={9} />
        <button>Buscar</button>
      </div>
    </div>
  );
};

export default App;
