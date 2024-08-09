import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'MatchPasswords', async: false})
export class MatchPasswords implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): Promise<boolean> | boolean {
        if (password != (args.object as any)[args.constraints[0]]) return false ;

       return true;
        
    }

    defaultMessage(args: ValidationArguments): string {
        return "Password does not Match"
    }
}
 