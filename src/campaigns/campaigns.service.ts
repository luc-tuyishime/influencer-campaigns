import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { Submission } from './schemas/submission.schema';
import { SubmitCampaignDto } from './dto/submit-campaigns.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async getInfluencerCampaigns(influencerId: string) {
    return this.campaignModel
      .find({ status: 'ACTIVE' })
      .select('title description deadline status requirements metrics')
      .exec();
  }

  async submitCampaignContent(
    influencerId: string,
    submissionDto: SubmitCampaignDto,
  ) {

    if (!Types.ObjectId.isValid(submissionDto.campaignId)) {
      throw new BadRequestException('Invalid campaign ID format');
    }

    const campaign = await this.campaignModel.findById(submissionDto.campaignId);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${submissionDto.campaignId} not found`);
    }

    if (campaign.status !== 'ACTIVE') {
      throw new BadRequestException('Campaign is not active');
    }

    if (new Date(campaign.deadline) < new Date()) {
      throw new BadRequestException('Campaign deadline has passed');
    }

    try {
      const submission = new this.submissionModel({
        campaignId: new Types.ObjectId(submissionDto.campaignId),
        influencerId: new Types.ObjectId(influencerId),
        contentUrl: submissionDto.contentUrl,
        platform: submissionDto.platform,
        description: submissionDto.description,
        status: 'PENDING',
      });

      await submission.save();

      await this.campaignModel.findByIdAndUpdate(
        submissionDto.campaignId,
        {
          $inc: { 'metrics.totalSubmissions': 1 },
          $addToSet: { influencers: new Types.ObjectId(influencerId) },
        },
        { new: true },
      );

      return {
        success: true,
        message: 'Submission created successfully',
        submission: submission,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create submission: ' + error.message);
    }
  }

  async getCampaignDetails(campaignId: string) {
    if (!Types.ObjectId.isValid(campaignId)) {
      throw new BadRequestException('Invalid campaign ID format');
    }

    const campaign = await this.campaignModel.findById(campaignId);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return campaign;
  }

  async getActiveCampaigns() {
    return this.campaignModel.find({ status: 'ACTIVE' }).exec();
  }
}
