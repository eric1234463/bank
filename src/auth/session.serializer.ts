import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/users/users.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UserDocument,
    done: (err: Error | null, user: number) => void,
  ): void {
    console.log(`@SessionSerializer serializeUser`, user.id);
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error | null, payload?: UserDocument) => void,
  ): Promise<void> {
    console.log(`@SessionSerializer deserializeUser`, id);
    try {
      const user = await this.usersService.findOne(id);
      console.log(user)
      done(null, user);
    } catch(error) {
      done(error)
    }
  }
}
