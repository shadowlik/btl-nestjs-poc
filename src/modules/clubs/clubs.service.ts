import { Injectable } from '@nestjs/common';
import {
  drizzleClient,
  DrizzleService,
} from 'src/core/drizzle/drizzle.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ClubWithDrizzle, ClubWithPrisma } from './entities/club.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class ClubsService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly prisma: PrismaService,
  ) {}

  findAll(): Promise<ClubWithPrisma[]> {
    return this.prisma.clubs.findMany({
      take: 10,
      include: {
        club_programs: {
          where: { programs: { canceled_at: { not: null } } },
        },
      },
    });
  }

  async findAllDrizzle(): Promise<ClubWithDrizzle[]> {
    const clubs = await drizzleClient.query.clubs.findMany({
      with: {
        club_programs: {
          with: {
            programs: {
              where: (programs) => {
                return eq(programs.canceled_at, null);
              },
            },
          },
        },
      },
    });

    return clubs;
  }
}
