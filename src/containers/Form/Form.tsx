import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { Props } from "./types.ts";
import { EXAMPLE_CODE } from "./constants.ts";

export const Form: FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleTextarea: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  const handleClear = () => {
    setValue("");
    onSubmit("");
  };

  const handleExample = () => {
    setValue(EXAMPLE_CODE);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <textarea
        value={value}
        onChange={handleTextarea}
        placeholder="Insert HTML code"
        className="p-4 w-full resize-y rounded-2xl min-h-52"
      />
      <div className="flex mt-4">
        <button
          type="button"
          className="px-8 py-4 rounded-lg bg-green-700 text-white hover:bg-cyan-950 mr-auto"
          onClick={handleExample}
        >
          Example
        </button>
        <button
          type="button"
          className="px-8 py-4 rounded-lg bg-gray-800 text-white hover:bg-cyan-950"
          onClick={handleClear}
        >
          CLEAR
        </button>
        <button
          type="submit"
          className="px-8 py-4 rounded-lg bg-cyan-800 text-white disabled:bg-gray-500 hover:bg-cyan-950 ml-2"
        >
          APPLY
        </button>
      </div>
    </form>
  );
};
