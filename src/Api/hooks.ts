import { useCallback, useState } from 'react';
import { API } from './index';


export const useMarkets = (): [any[], () => void] => {
  const [list, setList] = useState([])
  const fetch = useCallback(async () => {
    try {
      const res = await API.getMarkets()
      setList(res?.markets || [])
    } catch (error) {
      setList([])
    }
  }, [])
  return [list, fetch]
};
