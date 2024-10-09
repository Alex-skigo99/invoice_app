import { api } from "../utils/http_requests";
import { useEffect, useState, FC } from 'react';

type Data = {
    message: string;
};

const apiUrl = process.env.REACT_APP_API_URL;

const Hello: FC = () => {
    const [data, setData] = useState<Data | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const result: Data|undefined = await api.get(apiUrl + '/hello');
          console.log('Fetch result-', result);
          if (!result) return setData({ message: 'No data' }); 
          setData(result);
        } catch (err) {
          setError('Error fetching data');
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
