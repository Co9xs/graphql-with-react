import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag"
import { Query } from "react-apollo"
import client from "./client"

const ME = gql`
  query me {
    user(login: "Co9xs") {
      name
      avatarUrl
    }
  }
`

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h2>Hello GraphQL</h2>
      <Query query={ME}>
        {
          ({loading, error, data}) => {
            if (loading) return "Loading..."
            if (error) return `${error.message}`
            return `${data.user.name}`
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
