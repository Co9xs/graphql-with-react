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
            const search = data.search
            const repositoryCount = search.repositoryCount
            const repositoryUnit = repositoryCount === 1 ? "Repository" : "Repositories"
            const title = `GitHub Repositories Search Results - ${repositoryCount} ${repositoryUnit}`
            const nodes = search.edges.map(edge => edge.node)
            return (
              <>
              <h2>{title}</h2>
              <ul>
                {nodes.map(node => (
                  <li key={node.id}>
                    <a href={node.url}>{node.name}</a>
                    <button>{node.stargazers.totalCount} starts | {node.viewerHasStarred ? "starred" : "-"}</button>
                  </li>
                ))}
              </ul>
              </>
            )
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
