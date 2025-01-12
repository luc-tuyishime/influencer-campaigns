import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true, default: 'ACTIVE' })
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';

  @Prop({ type: [String], required: true })
  requirements: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  influencers: Types.ObjectId[];

  @Prop({
    type: {
      totalSubmissions: { type: Number, default: 0 },
      averageEngagement: { type: Number, default: 0 },
    },
  })
  metrics: {
    totalSubmissions: number;
    averageEngagement: number;
  };
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
