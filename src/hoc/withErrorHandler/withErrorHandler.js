import React , {useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxiliar from "../Auxiliar/Auxiliar";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
      
  const reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
    const resInterceptor = axios.interceptors.response.use(null, (err) => {
        setError(err);
      });
      
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };
      return (
        <Auxiliar>
          <Modal
            show={error}
            modalClosed={errorConfirmedHandler}
          >
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Auxiliar>
      );
    }
};

export default withErrorHandler;
