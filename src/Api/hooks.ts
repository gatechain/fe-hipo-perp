import { useCallback, useState } from 'react';
import { API } from './index';


export const useMarkets = (): [any[], () => void] => {
  const [list, setList] = useState([])
  const fetch = useCallback(async () => {
    try {
      const { data } = await API.getMarkets()
      setList(data?.data?.markets || [])
    } catch (error) {
      setList([])
    }
  }, [])
  return [list, fetch]
};