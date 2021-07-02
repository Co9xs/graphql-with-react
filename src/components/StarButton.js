import { useMutation } from "@apollo/client"
import { ADD_STAR, REMOVE_STAR } from "../graphql/mutations"

export const StarButton = (props) => {
  const { node } = props
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`

  // eslint-disable-next-line no-unused-vars
  const [addStar, { data: addStarData }] = useMutation(ADD_STAR)
  // eslint-disable-next-line no-unused-vars
  const [removeStar, { data: removeStarData }] = useMutation(REMOVE_STAR)

  const handleClick = () => {
    viewerHasStarred 
    ? removeStar({
      variables: { input: { starrableId: node.id } }
    })
    : addStar({
      variables: { input: { starrableId: node.id } }
    })
  }
  
  return (
    <button onClick={handleClick}>{starCount} | {viewerHasStarred ? "starred" : "-"}</button>
  )
}