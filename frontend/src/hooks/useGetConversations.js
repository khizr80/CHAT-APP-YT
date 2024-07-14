import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');

                // Check if the response is OK and is of type JSON
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Received non-JSON response');
                }

                const data = await res.json(); // Correctly await the promise
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                setConversations(data); // Consistent state naming
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        getConversations();
    }, []); // Empty dependency array to run effect only once on mount

    return { loading, conversations };
};

export default useGetConversations;
