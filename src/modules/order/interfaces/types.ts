import { TInjectServiceUseCaseDep } from 'src/types/inject-service-usecase-dep.type';

export const ORDERTYPES: TInjectServiceUseCaseDep = {
  services: {
    CreateOrderService: 'CreateOrderService',
  },
  useCases: {
    CreateOrderUseCase: 'CreateOrderUseCase',
  },
};
