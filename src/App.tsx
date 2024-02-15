import "./App.css";
import { Form } from "./containers/Form";
import { useState } from "react";
import { ResultCode } from "./containers/ResultCode";

function App() {
    const [code, setCode] = useState('');

    return (
        <>
            <Form onSubmit={setCode} />
            <ResultCode code={code} />
        </>
    );
}

export default App
