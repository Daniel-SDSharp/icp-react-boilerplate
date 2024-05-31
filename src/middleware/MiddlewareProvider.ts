import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeMiddleware } from '.';
import { setMiddlewareDependencies } from '../store/middleware/middleware.slice';
import { Identity } from "@dfinity/agent";

interface WithMiddlewareProps {
  identity: Identity;
}

const withMiddleware = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithMiddlewareProps) => {
    const { identity, ...rest } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      const initMiddleware = async () => {
        try {
          const dependencies = await initializeMiddleware(identity);
          dispatch(setMiddlewareDependencies(dependencies));
        } catch (error) {
          console.error("Error initializing middleware:", error);
        }
      };

      initMiddleware();
    }, [identity, dispatch]);

    return Component;
  };
};

export default withMiddleware;
