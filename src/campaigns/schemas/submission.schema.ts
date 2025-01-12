import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Campaign } from './campaign.schema';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: Campaign.name, required: true })
  campaignId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  influencerId: Types.ObjectId;

  @Prop({ required: true })
  contentUrl: string;

  @Prop({ required: true, enum: ['TIKTOK', 'INSTAGRAM', 'YOUTUBE'] })
  platform: string;

  @Prop({ default: 'PENDING', enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  status: string;

  @Prop()
  description?: string;

  @Prop({
    type: {
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
  })
  metrics: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
