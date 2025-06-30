import { ResponseController } from '../response-controller';

export interface ICountUsersUseCase {
  handle(): Promise<ResponseController<number>>;
}
