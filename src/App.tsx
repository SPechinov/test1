import "./App.css";
import { Form } from "./containers/Form";
import { useState } from "react";
import { ResultCode } from "./containers/ResultCode";

function App() {
  const [code, setCode] = useState("");

  return (
    <>
      <h1 className="text-3xl underline mb-12">Coder</h1>
      <Form onSubmit={setCode} />
      <ResultCode code={code} />
    </>
  );
}

export default App;
