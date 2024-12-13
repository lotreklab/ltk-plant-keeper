import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T>(endpoint: string, params?: Record<string, any>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await axiosClient.get<T>(endpoint, { params });
        console.log(response);

        setState({ data: response, loading: false, error: null });
      } catch (error: any) {
        console.error('Errore durante la richiesta:', error);
        setState({
          data: null,
          loading: false,
          error: error.message || 'Errore sconosciuto',
        });
      }
    };

    fetchData();
  }, [endpoint, params]);

  return state;
};

export default useFetchData;
