import { Injectable } from '@nestjs/common'
import { CreateEnergyReadingInput } from './dto/create-energy-reading.input'
import { InjectRepository } from '@nestjs/typeorm'
import { EnergyReading, MeterType } from './entities/energy-reading.entity'
import { MongoRepository } from 'typeorm'
// import { UpdateEnergyReadingInput } from './dto/update-energy-reading.input'

@Injectable()
export class EnergyReadingService {
  constructor(
    @InjectRepository(EnergyReading)
    private readonly energyReadingRepository: MongoRepository<EnergyReading>,
  ) {}
  async create(createEnergyReadingInput: CreateEnergyReadingInput) {
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

  async findOne(recordedById: string) {
    return await this.energyReadingRepository.findOne({
      where: { _id: recordedById },
    })
  }

  async findByUser(userId: string): Promise<EnergyReading[]> {
    return await this.energyReadingRepository.find({
      where: { recordedById: userId },
    })
  }

  // update(id: number, updateEnergyReadingInput: UpdateEnergyReadingInput) {
  //   return `This action updates a #${id} energyReading`
  // }

  async remove(readingId: string) {
    return await this.energyReadingRepository.delete({ _id: readingId })
  }
}
