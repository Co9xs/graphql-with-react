export const StarButton = (props) => {
  const { node } = props
  return (
    <button>{node.stargazers.totalCount} starts | {node.viewerHasStarred ? "starred" : "-"}</button>
  )
}