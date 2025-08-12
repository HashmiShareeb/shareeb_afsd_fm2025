import gql from 'graphql-tag'

//created by the users with USERS rol
export const MY_SPECIAL_REQUESTS = gql`
  query MyMaintenanceReport($userId: String!) {
    myMaintenanceReport(userId: $userId) {
      reportId
      title
      description
      reportedAt
      status
      reportedBy {
        id
        name
      }
      room {
        roomId
        name
      }
      building {
        buildingId
        name
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
