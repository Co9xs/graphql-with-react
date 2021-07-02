export const StarButton = (props) => {
  const { node } = props
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`
  return (
    <button>{starCount} | {viewerHasStarred ? "starred" : "-"}</button>
  )
}