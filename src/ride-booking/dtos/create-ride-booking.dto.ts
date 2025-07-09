import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RideStatus, RideType } from 'src/common/enums/ride-booking.enum';

export class CreateRideBookingDto {
  @IsNotEmpty()
  @IsEnum(RideType)
  type: RideType;

  @IsNotEmpty()
  @IsNumber()
  driver_id: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  additional_costs?: number;

  @IsOptional()
  @IsString()
  additional_cost_reason?: string;

  @IsNotEmpty()
  @IsNumber()
  ride_km: number;

  @IsNotEmpty()
  @IsNumber()
  ride_timing: number;

  @IsOptional()
  @IsNumber()
  ride_delay_time?: number;

  @IsOptional()
  @IsString()
  cancellation_reason?: string;
}

export class UpdateRideBookingDto {
  @IsOptional()
  @IsEnum(RideType)
  type?: RideType;

  @IsOptional()
  @IsEnum(RideStatus)
  ride_status?: RideStatus;

  @IsOptional()
  @IsNumber()
  driver_id?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  additional_costs?: number;

  @IsOptional()
  @IsString()
  additional_cost_reason?: string;

  @IsOptional()
  @IsNumber()
  ride_km?: number;

  @IsOptional()
  @IsNumber()
  ride_timing?: number;

  @IsOptional()
  @IsNumber()
  ride_delay_time?: number;

  @IsOptional()
  @IsString()
  cancellation_reason?: string;
}

export class CalculateFareDto {
  @IsNumber()
  ride_km: number;

  @IsNumber()
  ride_timing: number;

  @IsNumber()
  ride_delay_time: number;
}
