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
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URL');
        if (!uri) {
          throw new Error('MONGO_URL is not defined in environment variables');
        }
        console.log('Attempting to connect to MongoDB with URI configuration');
        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('MongoDB connection established successfully');
            });
            connection.on('error', (error) => {
              console.error('MongoDB connection error:', error);
            });
            return connection;
          }
        };
      },
    }),
    AuthModule,
    UsersModule,
    CampaignsModule,
  ],
})
export class AppModule {}
