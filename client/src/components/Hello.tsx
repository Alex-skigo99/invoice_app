import { api } from "../utils/http_requests";
import { useEffect, useState } from 'react';

type Data = {
    message: string;
};

const apiUrl = process.env.REACT_APP_API_URL;

const Hello = () => {
    const [data, setData] = useState<Data | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const result: Data|undefined = await api.get(apiUrl + '/hello');
          console.log('Fetch result-', result);
          if (!result) throw new Error('No data'); 
          setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
  
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }
    
    return <div>{data?.message}</div>;
    
};

export default Hello;
