import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SubmitCampaignDto } from './dto/submit-campaigns.dto';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  getActiveCampaigns() {
    return this.campaignsService.getActiveCampaigns();
  }

  @Get('influencer')
  getInfluencerCampaigns(@Request() req) {
    return this.campaignsService.getInfluencerCampaigns(req.user.userId);
  }

  @Post('create')
  submitCampaignContent(
    @Request() req,
    @Body() submitCampaignDto: SubmitCampaignDto,
  ) {
    return this.campaignsService.submitCampaignContent(
      req.user.userId,
      submitCampaignDto,
    );
  }

  @Get(':id')
  getCampaignDetails(@Param('id') id: string) {
    return this.campaignsService.getCampaignDetails(id);
  }
}
