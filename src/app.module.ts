import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {

        const mongoUrl = configService.get<string>('MONGO_URL');
        if (!mongoUrl) {
          console.error('MongoDB URL is not defined');
          throw new Error('MONGO_URL environment variable is not defined');
        }

        return {
          uri: mongoUrl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    CampaignsModule,
  ],
})
export class AppModule {}
