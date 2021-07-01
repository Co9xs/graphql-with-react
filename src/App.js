import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo"
import client from "./client"
import { ME } from "./graphql"


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
