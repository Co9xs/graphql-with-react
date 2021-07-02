import { useState } from "react"
import { InputForm } from "./InputForm"
import { SearchResult } from "./SearchResult"

const PER_PAGE = 5
const DEFAULT_STATE = {
  first: PER_PAGE,
  last: null,
  after: null,
  before: null,
  query: "フロントエンドエンジニア"
}

const App = (props) => {
  const [variables, setVariables] = useState(DEFAULT_STATE)
  const { query, first, last, before, after } = variables

  return (
    <>
      <InputForm query={query} defaultVariables={DEFAULT_STATE} setVariables={setVariables}/>
      <SearchResult variables={variables} setVariables={setVariables}/>
    </>
  );
}

export default App;
