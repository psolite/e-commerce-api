import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator"
import { MatchPasswords } from "../match.decorator"

export class CreateAuthDto {

    @MinLength(3)
    @MaxLength(15)
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @Validate(MatchPasswords, ['password'])
    password_confirmation: string;

}
