import "./App.css";
import { Form } from "./containers/Form";
import { useState } from "react";
import { ThreeElement } from "./types";

function App() {
  const [code, setCode] = useState<ThreeElement[]>([]);

  return (
    <>
      <h1 className="text-3xl underline mb-12">Coder</h1>
      <Form onSubmit={setCode} />
    </>
  );
}

export default App;
