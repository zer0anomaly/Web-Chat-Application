import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateChatCreationDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	user1: string;


	@IsString()
	@IsNotEmpty()
	@IsEmail()
	user2: string;
}
