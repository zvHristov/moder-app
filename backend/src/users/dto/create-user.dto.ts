export class CreateUserDto {
    _id: string;
    userId: string;
    name: string;
    email: string;
    password: string;
    refreshToken: string;
    createdDate: Date;   
}
