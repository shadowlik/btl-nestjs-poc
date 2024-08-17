import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger = new Logger(AppService.name);

  constructor(private readonly config: ConfigService) {}

  onApplicationBootstrap() {
    setTimeout(() => {
      this.logger.debug(
        `OpenAPI: http://localhost:${this.config.get('PORT')}/docs`,
      );
      this.logger.debug(`REST: http://localhost:${this.config.get('PORT')}`);
    }, 800);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
