import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ){ super()}

    async validate (username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException('Username or password is not correct')
        }
        const payload = {id: user.id}
        const jwt = this.jwtService.sign(payload)
        return {"access_token": jwt, user}
    }
}