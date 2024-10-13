import { api } from "../utils/http_requests";
import { useEffect, useState } from 'react';

type Data = {
    message: string;
};

const apiUrl = process.env.REACT_APP_API_URL;

const Hello = () => {
    const [data, setData] = useState<Data | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const result: Data|undefined = await api.get(apiUrl + '/hello');
          console.log('Fetch result-', result);
          setData(result);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
  
    if (loading) {
        return <div>Loading...</div>;
    }
        
    return <div>{data?.message}</div>;
    
};

export default Hello;
