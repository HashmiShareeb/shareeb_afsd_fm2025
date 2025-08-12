import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { MaintenancereportService } from './maintenancereport.service'
import { Maintenancereport } from './entities/maintenancereport.entity'
import { CreateMaintenancereportInput } from './dto/create-maintenancereport.input'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
import { Building } from 'src/building/entities/building.entity'
import { Room } from 'src/room/entities/room.entity'
import { RoomService } from 'src/room/room.service'
import { BuildingService } from 'src/building/building.service'
// import { UpdateMaintenancereportInput } from './dto/update-maintenancereport.input';

@Resolver(() => Maintenancereport)
export class MaintenancereportResolver {
  constructor(
    private readonly maintenancereportService: MaintenancereportService,
    private readonly userService: UserService,
    private readonly buildingService: BuildingService,
    private readonly roomService: RoomService,
  ) {}

  // @Mutation(() => Maintenancereport)
  // createMaintenancereport(
  //   @Args('createMaintenancereportInput')
  //   createMaintenancereportInput: CreateMaintenancereportInput,
  // ) {
  //   return this.maintenancereportService.create(createMaintenancereportInput)
  // }

  @Mutation(() => Maintenancereport)
  async createMaintenanceReport(
    @Args('input') input: CreateMaintenancereportInput,
  ): Promise<Maintenancereport> {
    return this.maintenancereportService.create(input)
  }

  // Field resolver to fetch user by reportedById dynamically
  // @ResolveField(() => User, { nullable: true })
  // async reportedBy(@Parent() report: Maintenancereport): Promise<User | null> {
  //   console.log('reportedById:', report.reportedById)
  //   if (!report.reportedById) return null

  //   try {
  //     return await this.userService.findOne(report.reportedById)
  //   } catch (err) {
  //     console.error('Error fetching user:', err)
  //     return null
  //   }
  // }

  @ResolveField(() => User, { nullable: true })
  async reportedBy(@Parent() report: Maintenancereport): Promise<User | null> {
    console.log('Resolving reportedBy for report', report.reportId)
    if (!report.reportedById) return null
    return this.userService.findOne(report.reportedById)
  }

  @Query(() => [Maintenancereport], { name: 'maintenancereport' })
  findAll() {
    return this.maintenancereportService.findAll()
  }

  @Mutation(() => Maintenancereport)
  async updateMaintenanceReportStatus(
    @Args('reportId', { type: () => String }) reportId: string,
    @Args('status', { type: () => String }) status: string,
  ): Promise<Maintenancereport> {
    return this.maintenancereportService.updateStatus(reportId, status)
  }

  // @Query(() => Maintenancereport, { name: 'maintenancereport' })
  // findOne(@Args('reportId', { type: () => String }) reportId: string) {
  //   return this.maintenancereportService.findOne(reportId)
  // }

  // @Mutation(() => Maintenancereport)
  // updateMaintenancereport(
  //   @Args('updateMaintenancereportInput')
  //   updateMaintenancereportInput: UpdateMaintenancereportInput,
  // ) {
  //   return this.maintenancereportService.update(
  //     updateMaintenancereportInput.id,
  //     updateMaintenancereportInput,
  //   )
  // }

  @Query(() => [Maintenancereport], { name: 'myMaintenanceReport' })
  async myMaintenanceReport(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.maintenancereportService.findByUser(userId)
  }

  @Mutation(() => Boolean)
  removeMaintenanceReport(
    @Args('reportId', { type: () => String }) reportId: string,
  ) {
    return this.maintenancereportService.remove(reportId)
  }

  @ResolveField(() => Room, { nullable: true })
  async room(@Parent() report: Maintenancereport) {
    if (!report.roomId) return null
    return this.roomService.findOne(report.roomId)
  }

  @ResolveField(() => Building, { nullable: true })
  async building(@Parent() report: Maintenancereport) {
    if (!report.buildingId) return null
    return this.buildingService.findOne(report.buildingId)
  }
}
