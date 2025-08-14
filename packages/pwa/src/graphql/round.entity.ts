import gql from 'graphql-tag'

export const GET_ROUNDS = gql`
  query GetRounds {
    rounds {
      roundId
      name
      status
      assignedTo {
        id
        uid
        name
        role
      }
      rooms {
        roomId
        order
      }
      buildingId
    }
  }
`

export const MY_ROUNDS = gql`
  query MyRounds($userId: String!) {
    myRounds(userId: $userId) {
      roundId
      name
      assignedTo {
        id
        uid
        name
      }
      rooms {
        roundRoomId
        roomId
        order
        checklist {
          itemId
          label
          notes
          status
        }
      }
      buildingId
      status
    }
  }
`
