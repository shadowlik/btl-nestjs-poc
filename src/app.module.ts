import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubsModule } from './modules/clubs/clubs.module';
import { VenuesModule } from './modules/venues/venues.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { DrizzleModule } from './core/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ClubsModule,
    VenuesModule,
    PrismaModule,
    DrizzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
