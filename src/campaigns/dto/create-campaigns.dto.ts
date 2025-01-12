import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  deadline: Date;

  @IsArray()
  @IsString({ each: true })
  requirements: string[];
}
