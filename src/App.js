import { useState } from "react"
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo"
import client from "./client"
import { SEARCH_REPOSITORIES } from "./graphql"

const DEFAULT_STATE = {
  first: 5,
  last: null,
  after: null,
  before: null,
  query: "フロントエンドエンジニア"
}

const App = (props) => {
  const [gqlVars, setGqlVars] = useState(DEFAULT_STATE)
  const { query, first, last, before, after } = gqlVars
  console.log({query})

  const handleChange = (e) => {
    setGqlVars({
      ...DEFAULT_STATE,
      query: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <ApolloProvider client={client}>
      <h2>Hello GraphQL</h2>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={handleChange}/>
      </form>
      <Query 
        query={SEARCH_REPOSITORIES}
        variables={{ query, first, last, before, after }}
      >
        {
          ({loading, error, data}) => {
            if (loading) return "Loading..."
            if (error) return `${error.message}`
            console.log({data})
            console.log(data.search.edges)
            return (
              <ul>
              </ul>
            )
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
