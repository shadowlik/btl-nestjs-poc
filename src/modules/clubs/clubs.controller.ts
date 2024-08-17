import { Controller, Get } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubWithPrisma } from './entities/club.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  findAll(): Promise<ClubWithPrisma[]> {
    return this.clubsService.findAll();
  }
}
