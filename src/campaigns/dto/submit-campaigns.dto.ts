import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class SubmitCampaignDto {
  @IsString()
  @IsNotEmpty()
  campaignId: string;

  @IsUrl()
  contentUrl: string;

  @IsEnum(['TIKTOK', 'INSTAGRAM', 'YOUTUBE'])
  platform: 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE';

  @IsString()
  @IsOptional()
  description?: string;
}
