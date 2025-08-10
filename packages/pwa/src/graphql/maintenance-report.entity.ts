import gql from 'graphql-tag'

export const CREATE_MAINTENANCE_REPORT = gql`
  mutation createMaintenanceReport($input: CreateMaintenancereportInput!) {
    createMaintenanceReport(input: $input) {
      reportId
      title
      description
      reportedAt
      status
      reportedBy {
        id
        uid
        name
      }
    }
  }
`
