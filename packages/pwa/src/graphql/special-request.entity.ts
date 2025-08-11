import gql from 'graphql-tag'

//created by the users with USERS rol
export const MY_SPECIAL_REQUESTS = gql`
  query ($userId: String!) {
    mySpecialRequests(userId: $userId) {
      requestId
      title
      requestedBy {
        uid
        name
      }
      status
    }
  }
`
