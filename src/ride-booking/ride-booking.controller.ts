import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RideBookingService } from './ride-booking.service';
import {
  CalculateFareDto,
  CreateRideBookingDto,
  UpdateRideBookingDto,
} from './dtos/create-ride-booking.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserJwtAuthGuard } from 'src/auth/user/user-jwt.guard';
// import { RolesGuard } from 'src/common/guards/roles.guard';
// import { Roles } from 'src/common/decorators/roles.decorator';
//  RolesGuard
@UseGuards(UserJwtAuthGuard)
@Controller('ride-bookings')
export class RideBookingController {
  constructor(private readonly service: RideBookingService) {}

  @Post('calculate-fare')
  calculateFare(@Body() dto: CalculateFareDto) {
    return this.service.calculateFare(dto);
  }

  @Post('store')
  // @Roles('customer')
  create(
    @Body() dto: CreateRideBookingDto,
    @CurrentUser('id') customerId: number,
  ) {
    return this.service.create(dto, customerId);
  }

  @Get('list')
  findAll() {
    return this.service.findAll();
  }

  /* @Get('my-rides')
  getMyRides(@CurrentUser('id') userId: number) {
    return this.service.getMyRides(userId);
  } */

  @Get('show/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() dto: UpdateRideBookingDto) {
    return this.service.update(id, dto);
  }
}
