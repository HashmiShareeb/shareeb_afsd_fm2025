import gql from 'graphql-tag'

export const ADD_NEW_USER = gql`
  mutation createOwnAccount($myinput: CreateUserInput!) {
    createOwnUseraccount(createUserInput: $myinput) {
      id
      uid
      role
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      uid
      name
      role
    }
  }
`
