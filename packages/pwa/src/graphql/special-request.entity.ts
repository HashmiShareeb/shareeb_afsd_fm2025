import gql from 'graphql-tag'

//created by the users with USERS rol
export const MY_SPECIAL_REQUESTS = gql`
  mySpecialRequests(userId: $userId) {
    requestId
    title
    requestedBy{uid,name}
     building {
      buildingId
      name
      address
      rooms {
        roomId
        name
      }
    }
    status
  }
}
`

export const GET_ALL_SPECIAL_REQUESTS = gql`
  query {
    specialrequest {
      requestId
      title
      description
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
