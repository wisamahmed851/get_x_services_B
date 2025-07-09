import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideBooking } from './entity/ride-booking.entity';
import { Repository } from 'typeorm';
import {
  CalculateFareDto,
  CreateRideBookingDto,
  UpdateRideBookingDto,
} from './dtos/create-ride-booking.dto';
import { User } from 'src/users/entity/user.entity';
import { RideFareStandard } from 'src/ride-fare-standards/entity/ride-fare-standards.entity';

@Injectable()
export class RideBookingService {
  constructor(
    @InjectRepository(RideBooking)
    private readonly rideBookRepo: Repository<RideBooking>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(RideFareStandard)
    private readonly fareRepo: Repository<RideFareStandard>,
  ) {}

  // ride-booking.service.ts
  async calculateFare(dto: CalculateFareDto) {
    const { ride_km, ride_timing, ride_delay_time } = dto;

    const fareStandard = await this.fareRepo.findOne({
      where: { status: 1 },
    });

    if (!fareStandard) {
      return {
        success: false,
        message: 'No active fare standard found',
      };
    }

    // Basic Fare
    const baseFare = Number(fareStandard.price_per_km) * ride_km;

    // Surcharge
    const surcharge_amount = (fareStandard.sur_charge / 100) * baseFare;

    // Traffic Delay Penalty
    const delayPenalty =
      ride_delay_time > fareStandard.traffic_delay_time
        ? (fareStandard.traffic_delay_charge / 100) * baseFare
        : 0;

    // App Fees (fixed)
    const app_fees_amount = Number(fareStandard.app_fees);

    // Company Fees (%)
    const company_fees_amount = (fareStandard.company_fees / 100) * baseFare;

    // Driver Fees (%)
    const driver_fees_amount = (fareStandard.driver_fees / 100) * baseFare;

    // Additional Costs
    const additional_cost = Number(fareStandard.additional_cost || 0);

    // Discount
    const discount = Number(fareStandard.discount || 0);

    const fare_amount =
      baseFare +
      surcharge_amount +
      delayPenalty +
      app_fees_amount +
      company_fees_amount +
      additional_cost -
      discount;

    return {
      success: true,
      message: 'Fare calculated successfully',
      data: {
        ride_km,
        ride_timing,
        ride_delay_time,
        base_fare: baseFare,
        surcharge_amount,
        traffic_delay_amount: delayPenalty,
        app_fees_amount,
        company_fees_amount,
        driver_fees_amount,
        additional_cost,
        discount,
        total_fare: fare_amount,
      },
    };
  }

  async create(dto: CreateRideBookingDto, customer_id: number) {
    try {
      const fare_standard = await this.fareRepo.findOne({
        where: { status: 1 },
      });

      if (!fare_standard) {
        throw new Error('No active fare standard found');
      }

      const fare_id = fare_standard.id;
      const ride_km = dto.ride_km;
      const ride_delay_time = dto.ride_delay_time || 0;

      // Step 1: Base fare
      const fare_amount = Number(fare_standard.price_per_km) * ride_km;

      // Step 2: Surcharge
      const surcharge_amount = (fare_amount * fare_standard.sur_charge) / 100;

      // Step 3: Traffic delay charges
      const traffic_delay_amount =
        ride_delay_time > fare_standard.traffic_delay_time
          ? (fare_amount * fare_standard.traffic_delay_charge) / 100
          : 0;

      // Step 4: Driver fees
      const driver_fees_amount =
        (fare_amount * fare_standard.driver_fees) / 100;

      // Step 5: Company fees
      const company_fees_amount =
        (fare_amount * fare_standard.company_fees) / 100;

      // Step 6: App fees
      const app_fees_amount = Number(fare_standard.app_fees);

      // Step 7: Additional cost & discount from DTO
      const additional_cost = dto.additional_costs || 0;
      const discount = dto.discount || 0;

      const ride = this.rideBookRepo.create({
        ride_type: dto.type,
        customer_id,
        driver_id: dto.driver_id,
        fare_standard_id: fare_id,
        fare_standard,
        ride_km,
        ride_timing: dto.ride_timing,
        ride_delay_time,
        cancel_reason: dto.cancellation_reason,

        fare_amount,
        discount,
        additional_cost,
        additional_cost_reason: dto.additional_cost_reason,
        surcharge_amount,
        traffic_delay_amount,
        driver_fees_amount,
        company_fees_amount,
        app_fees_amount,
      });

      const saved = await this.rideBookRepo.save(ride);
      return {
        success: true,
        message: 'Ride booking created successfully',
        data: saved,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async findAll() {
    try {
      const list = await this.rideBookRepo.find({
        order: { created_at: 'DESC' },
      });
      return {
        success: true,
        message: 'All ride bookings fetched',
        data: list,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async findOne(id: number) {
    try {
      const ride = await this.rideBookRepo.findOne({ where: { id } });
      if (!ride) throw new NotFoundException('Ride booking not found');
      return {
        success: true,
        message: 'Ride booking found',
        data: ride,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async update(id: number, dto: UpdateRideBookingDto) {
    try {
      const ride = await this.rideBookRepo.findOne({ where: { id } });
      if (!ride) throw new NotFoundException('Ride booking not found');

      Object.assign(ride, dto);
      ride.updated_at = new Date().toISOString().split('T')[0];
      const updated = await this.rideBookRepo.save(ride);
      return {
        success: true,
        message: 'Ride booking updated successfully',
        data: updated,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async getRidesByUser(userId: number) {
    try {
      const rides = await this.rideBookRepo.find({
        where: [{ customer_id: userId }, { driver_id: userId }],
        order: { created_at: 'DESC' },
      });
      return {
        success: true,
        message: 'My rides retrieved successfully',
        data: rides,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  private handleUnknown(err: unknown): never {
    if (err instanceof BadRequestException || err instanceof NotFoundException)
      throw err;
    console.error(err);
    throw new InternalServerErrorException('Unexpected error', {
      cause: err as Error,
    });
  }
}
