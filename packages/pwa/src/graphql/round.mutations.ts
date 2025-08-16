import gql from 'graphql-tag'

// export const CREATE_ROUND = gql`
//   mutation CreateRound($createRoundInput: CreateRoundInput!) {
//     createRound(input: $createRoundInput) {
//       id
//       name
//       assignedToId
//       buildingId
//       rooms {
//         id
//         name
//         floor
//         capacity
//         floor
//         capacity
//       }
//       assignedTo {
//         uid
//         name
//         role
//       }
//       status
//     }
//   }
// `

export const CREATE_ROUND = gql`
  mutation CreateRound($createRoundInput: CreateRoundInput!) {
    createRound(createRoundInput: $createRoundInput) {
      roundId
      name
      assignedTo {
        id
        name
      }
      buildingId
      rooms {
        roomId
        roundRoomId
        order
      }
      status
    }
  }
`

export const UPDATE_ROUND = gql`
  mutation UpdateRound($updateRoundInput: UpdateRoundInput!) {
    updateRound(updateRoundInput: $updateRoundInput) {
      roundId
      name
      assignedTo {
        id
        name
      }
      buildingId
      rooms {
        roomId
        roundRoomId
        order
      }
      status
    }
  }
`

export const CREATE_CHECKLIST_ITEM = gql`
  mutation AddChecklistItem(
    $roundId: String!
    $roundRoomId: String!
    $label: String!
    $notes: String
  ) {
    addChecklistItem(
      roundId: $roundId
      roundRoomId: $roundRoomId
      label: $label
      notes: $notes
    ) {
      itemId
      label
      status
      notes
    }
  }
`
export const UPDATE_CHECKLIST_ITEM = gql`
  mutation UpdateChecklistItem(
    $roundId: String!
    $roundRoomId: String!
    $itemId: String!
    $status: ChecklistItemStatus!
  ) {
    updateChecklistItem(
      roundId: $roundId
      roundRoomId: $roundRoomId
      itemId: $itemId
      status: $status
    ) {
      itemId
      label
      status
    }
  }
`
