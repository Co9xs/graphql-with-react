import { useState } from "react"
import { InputForm } from "./components/InputForm"
import { SearchResult } from "./components/SearchResult"
import { DEFAULT_VARIABLES } from "./utils/constants"


const App = (props) => {
  const [variables, setVariables] = useState(DEFAULT_VARIABLES)
  const { query } = variables

  return (
    <>
      <InputForm query={query} setVariables={setVariables} defaultVariables={DEFAULT_VARIABLES}/>
      <SearchResult variables={variables} setVariables={setVariables}/>
    </>
  );
}

export default App;
