import { Injectable } from '@nestjs/common'
import { CreateEnergyReadingInput } from './dto/create-energy-reading.input'
import { InjectRepository } from '@nestjs/typeorm'
import { EnergyReading, MeterType } from './entities/energy-reading.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
// import { UpdateEnergyReadingInput } from './dto/update-energy-reading.input'

@Injectable()
export class EnergyReadingService {
  constructor(
    @InjectRepository(EnergyReading)
    private readonly energyReadingRepository: MongoRepository<EnergyReading>,
  ) {}
  async create(
    createEnergyReadingInput: CreateEnergyReadingInput,
  ): Promise<EnergyReading> {
    // Create a new EnergyReading object from input
    const reading = {
      ...createEnergyReadingInput,
      recordedAt: createEnergyReadingInput.recordedAt ?? new Date(),
      unit:
        createEnergyReadingInput.meterType === MeterType.ELECTRICITY
          ? 'kWh'
          : 'm³',
    }
    return await this.energyReadingRepository.save(reading)
  }

  async findAll(): Promise<EnergyReading[]> {
    return this.energyReadingRepository.find()
  }

  async findOne(recordedById: string): Promise<EnergyReading | null> {
    return await this.energyReadingRepository.findOne({
      where: { _id: recordedById },
    })
  }

  async findByUser(userId: string): Promise<EnergyReading[]> {
    return await this.energyReadingRepository.find({
      where: { recordedById: userId },
    })
  }

  async findByBuildingId(buildingId: string): Promise<EnergyReading[]> {
    return await this.energyReadingRepository.find({
      where: { buildingId },
    })
  }

  // update(id: number, updateEnergyReadingInput: UpdateEnergyReadingInput) {
  //   return `This action updates a #${id} energyReading`
  // }

  async remove(readingId: string): Promise<EnergyReading | null> {
    const energyReading = await this.energyReadingRepository.findOne({
      where: { _id: new ObjectId(readingId) }, // Convert to ObjectId
    })

    if (!energyReading) {
      throw new Error(`EnergyReading with ID ${readingId} not found`)
    }

    await this.energyReadingRepository.delete(new ObjectId(readingId))
    return energyReading
  }

  //seeding

  async saveAll(readings: EnergyReading[]): Promise<EnergyReading[]> {
    return this.energyReadingRepository.save(readings)
  }

  async truncate(): Promise<void> {
    await this.energyReadingRepository.deleteMany({})
  }
}
