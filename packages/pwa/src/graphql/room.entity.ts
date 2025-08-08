import gql from 'graphql-tag'

export const GET_ROUNDS = gql`
  query GetRounds {
    rounds {
      roundId
      name
      status
      assignedToId
      assignedTo {
        name
        role
      }
      buildingId
      rooms {
        roomId
        order
      }
    }
  }
`
