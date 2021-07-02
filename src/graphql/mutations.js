import { gql } from "@apollo/client"

export const ADD_STAR = gql`
  mutation addStar ($input: AddStarInput!) {
    addStar (input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

export const REMOVE_STAR = gql`
  mutation removeStar ($input: RemoveStarInput!) {
    removeStar (input: $input) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`