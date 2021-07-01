import { useState } from "react"
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo"
import client from "./client"
import { SEARCH_REPOSITORIES } from "./graphql"

const VARIABLES = {
  first: 5,
  last: null,
  after: null,
  before: null,
  query: "フロントエンドエンジニア"
}

const App = (props) => {
  const [gqlVars, setGqlVars] = useState(VARIABLES)
  const { query, first, last, before, after } = gqlVars
  console.log({ query, first, last, before, after })
  return (
    <ApolloProvider client={client}>
      <h2>Hello GraphQL</h2>
      <Query 
        query={SEARCH_REPOSITORIES}
        variables={{ query, first, last, before, after }}
      >
        {
          ({loading, error, data}) => {
            if (loading) return "Loading..."
            if (error) return `${error.message}`
            console.log({data})
            return <div></div>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
