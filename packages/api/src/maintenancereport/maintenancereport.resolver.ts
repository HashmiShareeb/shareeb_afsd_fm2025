import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { MaintenancereportService } from './maintenancereport.service'
import { Maintenancereport } from './entities/maintenancereport.entity'
import { CreateMaintenancereportInput } from './dto/create-maintenancereport.input'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
// import { UpdateMaintenancereportInput } from './dto/update-maintenancereport.input';

@Resolver(() => Maintenancereport)
export class MaintenancereportResolver {
  constructor(
    private readonly maintenancereportService: MaintenancereportService,
    private readonly userService: UserService,
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

  // @Query(() => Maintenancereport, { name: 'maintenancereport' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.maintenancereportService.findOne(id)
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

  @Mutation(() => Maintenancereport)
  removeMaintenancereport(@Args('id', { type: () => Int }) id: number) {
    return this.maintenancereportService.remove(id)
  }
}
