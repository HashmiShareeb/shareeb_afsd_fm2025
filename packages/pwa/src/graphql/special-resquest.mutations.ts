import gql from 'graphql-tag'

export const CREATE_SPECIAL_REQUEST = gql`
  mutation CreateSpecialrequest($input: CreateSpecialrequestInput!) {
    createSpecialrequest(createSpecialrequestInput: $input) {
      requestId
      title
      requestedBy {
        id
        name
        role
      }
    }
  }
`
