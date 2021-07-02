import { useQuery } from "@apollo/client"
import { SEARCH_REPOSITORIES } from "./graphql"

export const SearchResult = (props) => {
  const { variables, setVariables } = props 
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, { variables })

  const goNextPage = (search) => {
    setVariables({
      ...variables,
      after: search.pageInfo.endCursor,
    })
  }

  if (loading) return "Loading..."
  if (error) return `${error.message}`
  if (data) {
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
        { 
          search.pageInfo.hasNextPage ?
          <button onClick={goNextPage(search)}>Next</button> :
          null
        }
      </>
    )
  }
}