import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.enum';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(_config: ConfigService) {
      return {
        type: 'mysql' as 'mysql',
        host: _config.get(Configuration.DB_HOST),
        database: _config.get(Configuration.DB_NAME),
        username: _config.get(Configuration.DB_USERNAME),
        password: _config.get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../**/**/**/*.entity{.js, .ts}'],
        migrations: [__dirname + '/migrations/*{.ts, .js}'],
      } as ConnectionOptions;
    },
  }),
];
