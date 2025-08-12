import gql from 'graphql-tag'

export const GET_MAINTENANCE_REPORTS = gql`
  query GetMaintenanceReports {
    maintenancereport {
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
export const GET_MAINTENANCE_REPORT_BY_ID = gql`
  query GetMaintenanceReportById($reportId: String!) {
    maintenancereport(reportId: $reportId) {
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

export const MY_MAINTENANCE_REPORT = gql`
  query ($userId: String!) {
    myMaintenanceReport(userId: $userId) {
      reportId
      title
      reportedBy {
        uid
        name
      }
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
      reportedAt
    }
  }
`
