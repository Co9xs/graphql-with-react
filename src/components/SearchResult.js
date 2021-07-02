import { useQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES } from "../graphql/query"
import { PER_PAGE } from "../utils/constants"
import { StarButton } from "./StarButton"

export const SearchResult = (props) => {
  const { variables, setVariables } = props 
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, { variables })

  if (loading) return "Loading..."
  if (error) return `${error.message}`
  if (data) {
    const search = data.search
    const repositoryCount = search.repositoryCount
    const repositoryUnit = repositoryCount === 1 ? "Repository" : "Repositories"
    const title = `GitHub Repositories Search Results - ${repositoryCount} ${repositoryUnit}`
    const nodes = search.edges.map(edge => edge.node)
    const goNext = (e, search) => {
      setVariables({
        ...variables,
        before: null,
        after: search.pageInfo.endCursor
      })
    }
    const goPrevious = (e, search) => {
      setVariables({
        ...variables,
        before: search.pageInfo.startCursor,
        after: null,
        first: null,
        last: PER_PAGE,
      })
    }
    return (
      <>
        <h2>{title}</h2>
        <ul>
          {nodes.map(node => (
            <li key={node.id}>
              <a href={node.url} target="_blank" rel="noopener noreferrer">{node.name}</a>
              &nbsp;
              <StarButton node={node} variables={variables}/>
            </li>
          ))}
        </ul>
        { search.pageInfo.hasPreviousPage ? <button onClick={e => goPrevious(e, search)}>Privious</button> : null}
        { search.pageInfo.hasNextPage ? <button onClick={e => goNext(e, search)}>Next</button> : null}
      </>
    )
  }
}