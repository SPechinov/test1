import "./App.css";
import { useState } from "react";
import { ThreeElement } from "./types";
import { Form } from "./containers/Form";
import { Three } from "./containers/Three";

function App() {
  const [three, setThree] = useState<ThreeElement[]>([]);

  return (
    <>
      <h1 className="text-3xl underline mb-12">Coder</h1>
      <Form onSubmit={setThree} />
      {three.length > 0 && (
        <h2 className="text-3xl underline mb-12 mt-12">Three</h2>
      )}
      <Three three={three} />
    </>
  );
}

export default App;
