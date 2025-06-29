import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = process.hrtime();

    return next.handle().pipe(
      map((data) => {
        const [sec, nano] = process.hrtime(now);
        const timeSec = (sec * 1000 + nano / 1e6).toFixed(2);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          ...data,
          success: true,
          time: timeSec,
        };
      }),
    );
  }
}
