import gql from 'graphql-tag'

export const RECORD_ENERGY_READING = gql`
  mutation RecordEnergyReading(
    $buildingId: String!
    $meterType: MeterType!
    $value: Float!
    $unit: String!
    $recordedById: String!
  ) {
    recordEnergyReading(
      buildingId: $buildingId
      meterType: $meterType
      value: $value
      unit: $unit
      recordedById: $recordedById
    ) {
      buildingId
      meterType
      value
      recordedById
      recordedAt
    }
  }
`

export const REMOVE_ENERGY_READING = gql`
  mutation RemoveEnergyReading($readingId: String!) {
    removeEnergyReading(readingId: $readingId) {
      readingId
      buildingId
      meterType
      value
      recordedById
      recordedAt
    }
  }
`
