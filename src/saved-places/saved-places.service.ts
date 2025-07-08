import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedPlace } from './entity/saved-place.entity';
import {
  CreateSavedPlaceDto,
  UpdateSavedPlaceDto,
} from './dtos/saved-place.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class SavedPlacesService {
  constructor(
    @InjectRepository(SavedPlace)
    private readonly savedRepo: Repository<SavedPlace>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateSavedPlaceDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('Invalid user ID');
    }

    const savedPlace = this.savedRepo.create({
      ...dto,
      user_id: user.id,
      created_by: user.id,
    });

    const created = await this.savedRepo.save(savedPlace);

    return {
      success: true,
      message: 'Saved place has been created',
      data: created,
    };
  }

  async findAll(userId: number) {
    const list = await this.savedRepo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    return {
      success: true,
      message: 'Saved places fetched successfully',
      data: list,
    };
  }

  async findOne(id: number, userId: number) {
    const place = await this.savedRepo.findOne({
      where: { id, user_id: userId },
    });

    if (!place) {
      throw new NotFoundException('Saved place not found');
    }

    return {
      success: true,
      message: 'Saved place fetched successfully',
      data: place,
    };
  }

  async update(id: number, dto: UpdateSavedPlaceDto, userId: number) {
    const result = await this.savedRepo.findOne({
      where: { id, user_id: userId },
    });

    if (!result) {
      throw new NotFoundException('Saved place not found');
    }

    Object.assign(result, dto);
    const updated = await this.savedRepo.save(result);

    return {
      success: true,
      message: 'Saved place updated successfully',
      data: updated,
    };
  }

  async remove(id: number, userId: number) {
    const record = await this.savedRepo.findOne({
      where: { id, user_id: userId },
    });

    if (!record) {
      throw new NotFoundException('Saved place not found');
    }

    await this.savedRepo.remove(record);

    return {
      success: true,
      message: 'Saved place deleted successfully',
      data: {},
    };
  }
}
