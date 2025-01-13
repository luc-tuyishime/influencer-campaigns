import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.userModel.findOne({ email: registerDto.email });
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const newUser = new this.userModel({
        ...registerDto,
        password: hashedPassword,
      });

      const user = await newUser.save();

      const token = this.jwtService.sign({
        sub: user._id,
        email: user.email,
        role: user.role
      });

      const { password, ...result } = user.toJSON();
      return {
        user: result,
        token,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already registered');
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role
    });

    const { password, ...result } = user.toJSON();
    return {
      user: result,
      token,
    };
  }
}
