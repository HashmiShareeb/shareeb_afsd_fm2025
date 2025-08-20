import gql from 'graphql-tag'

export const CREATE_MAINTENANCE_REPORT = gql`
  mutation CreateMaintenancereport($input: CreateMaintenancereportInput!) {
    createMaintenancereport(createMaintenancereportInput: $input) {
      reportId
      title
      description
      reportedBy {
        id
        name
        role
      }
      status
      reportedAt
    }
  }
`

export const UPDATE_MAINTENANCE_REPORT_STATUS = gql`
  mutation UpdateMaintenanceReportStatus($reportId: String!, $status: String!) {
    updateMaintenanceReportStatus(reportId: $reportId, status: $status) {
      reportId
      status
    }
  }
`
