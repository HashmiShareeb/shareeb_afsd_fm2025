import gql from 'graphql-tag'

//created by the users with USERS rol
export const MY_SPECIAL_REQUESTS = gql`
  query ($userId: String!) {
    mySpecialRequests(userId: $userId) {
      requestId
      title
      description
      requestedAt
      status
      requestedBy {
        id
        name
      }
      building {
        buildingId
        name
        address
        rooms {
          roomId
          name
        }
      }
    }
  }
`

export const GET_ALL_SPECIAL_REQUESTS = gql`
  query {
    specialrequest {
      requestId
      title
      description
      requestedAt
      building {
        buildingId
        name
        address
        rooms {
          roomId
          name
        }
      }
      requestedBy {
        id
        name
      }
      status
    }
  }
`
