import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Zone } from "./entity/zone.entity";

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  // Common error handling function
  private handleError(error: any) {
    console.error('ZoneService Error:', error);
    throw new InternalServerErrorException(error.message || 'Something went wrong');
  }

  // Create
  async createZone(name: string, created_by: number) {
    try {
      if (!name || name.trim() === '') {
        throw new BadRequestException('Zone name is required');
      }
      if (!created_by) {
        throw new BadRequestException('Created_by is required');
      }

      const zone = this.zoneRepository.create({ name: name.trim(), created_by });
      const savedZone = await this.zoneRepository.save(zone);

      return {
        success: true,
        message: 'Zone created successfully',
        data: [savedZone],
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Find all
  async getAllZones() {
    try {
      const zones = await this.zoneRepository.find({ relations: ['admin'] });
      return {
        success: true,
        message: 'zones fetched successfully',
        data: zones,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Find one
  async getZoneById(id: number) {
    try {
      if (!id) throw new BadRequestException('Zone ID is required');

      const zone = await this.zoneRepository.findOne({ where: { id }, relations: ['admin'] });
      if (!zone) throw new NotFoundException(`Zone with ID ${id} not found`);

      return {
        success: true,
        message: 'Zone fetched successfully',
        data: [zone],
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update
  async updateZone(id: number, name: string) {
    try {
      if (!id) throw new BadRequestException('Zone ID is required');
      if (!name || name.trim() === '') throw new BadRequestException('Zone name is required');

      const zone = await this.zoneRepository.findOne({ where: { id } });
      if (!zone) throw new NotFoundException(`Zone with ID ${id} not found`);

      zone.name = name.trim();
      zone.updated_at = new Date().toISOString().split('T')[0];

      const updatedZone = await this.zoneRepository.save(zone);

      return {
        success: true,
        message: 'Zone updated successfully',
        data: [updatedZone],
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete
  async deleteZone(id: number) {
    try {
      if (!id) throw new BadRequestException('Zone ID is required');

      const zone = await this.zoneRepository.findOne({ where: { id } });
      if (!zone) throw new NotFoundException(`Zone with ID ${id} not found`);

      await this.zoneRepository.remove(zone);

      return {
        success: true,
        message: `Zone with ID ${id} deleted successfully`,
        data: [],
      };
    } catch (error) {
      this.handleError(error);
    }
  }
}
