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

export const UPDATE_STATUS_SPECIAL_REQUEST = gql`
  mutation UpdateSpecialRequestStatus($requestId: String!, $status: String!) {
    updateSpecialRequestStatus(requestId: $requestId, status: $status) {
      requestId
      status
    }
  }
`
