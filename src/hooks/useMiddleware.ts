import { useSelector } from 'react-redux';
import { IMiddlewareDependencies } from '../middleware';
import { RootState } from '../store';

const useMiddleware = (): IMiddlewareDependencies | null => {
  return useSelector((state: RootState) => state.middleware.dependencies);
};

export default useMiddleware;
