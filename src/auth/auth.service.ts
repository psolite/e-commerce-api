import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async create(createAuthDto: CreateAuthDto) {

    const { username, email, password } = createAuthDto

    const IsUsernameTaken = await this.findByUsername(username)
    const IsEmailTaken = await this.findByEmail(email)

    if (IsUsernameTaken) { throw new ConflictException('Username taken') }
    if (IsEmailTaken) { throw new ConflictException('Email already exists') }
    try {
      const hashedPassword = await bcrypt.hash(password, 5)

      const createUser = this.userRepo.create({
        ...createAuthDto,
        password: hashedPassword
      })

      const user = instanceToPlain(await this.userRepo.save(createUser));

      return user;
    } catch (error) {
      throw new BadRequestException('server error')
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: { email }
    })
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: { username }
    })
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new BadRequestException('Username or password is nor correct')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null
  }

}
