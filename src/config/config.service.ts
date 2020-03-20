import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevEnv: boolean = process.env.NODE_ENV !== 'production';

    if (isDevEnv) {
      const envFilePath: string = __dirname + '/../../.env';
      const existPath: boolean = existsSync(envFilePath);

      if (!existPath) {
        console.log('.env does not exist');
        process.exit(0);
      }

      this.envConfig = parse(readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUD_API_KEY: process.env.CLOUD_API_KEY,
        CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
        TYPEORM_SYNC: process.env.TYPEORM_SYNC,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
