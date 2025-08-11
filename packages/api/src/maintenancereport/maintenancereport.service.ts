import { Injectable } from '@nestjs/common'
import { CreateMaintenancereportInput } from './dto/create-maintenancereport.input'
//import { UpdateMaintenancereportInput } from './dto/update-maintenancereport.input'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Maintenancereport,
  ReportStatus,
} from './entities/maintenancereport.entity'
import { MongoRepository, ObjectId } from 'typeorm'

@Injectable()
export class MaintenancereportService {
  constructor(
    @InjectRepository(Maintenancereport)
    private readonly maintenanceReportRepository: MongoRepository<Maintenancereport>,
  ) {}

  async create(
    input: CreateMaintenancereportInput,
  ): Promise<Maintenancereport> {
    const report = this.maintenanceReportRepository.create({
      ...input,
      status: input.status ?? ReportStatus.NEW,
      reportedAt: new Date(),
    })
    return this.maintenanceReportRepository.save(report)
  }

  findAll() {
    return this.maintenanceReportRepository.find()
  }

  // async findOne(reportId: string): Promise<Maintenancereport> {
  //   const report = await this.maintenanceReportRepository.findOne({
  //     where: { _id: reportId },
  //   })
  //   if (!report) {
  //     throw new Error(`Maintenance report with id ${reportId} not found`)
  //   }
  //   return report

  // }

  async findOne(reportId: string): Promise<Maintenancereport> {
    const report = await this.maintenanceReportRepository.findOne({
      where: { reportId },
    })
    if (!report) {
      throw new Error(`Maintenance report with id ${reportId} not found`)
    }
    return report
  }

  // update(
  //   id: number,
  //   updateMaintenancereportInput: UpdateMaintenancereportInput,
  // ) {
  //   return `This action updates a #${id} maintenancereport`
  // }

  async remove(reportId: string): Promise<boolean> {
    const result = await this.maintenanceReportRepository.deleteOne({
      _id: new ObjectId(reportId),
    })
    return result.deletedCount > 0
  }
}
