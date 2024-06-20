import { useState, useEffect } from "react";
import axios from "axios";

const ScrapingDataNode = () => {
    const [fetchData, setFetchData] = useState([]);

    const dataProduct = async () => {
        try {
            const { data } = await axios.get('/api/result');
            return setFetchData(data);
        } catch (error) {
            return console.log("internal server error")
        }
    }

    useEffect(() => {
        dataProduct();
    }, []);

    // console.log(data)
    // console.log(fetchData)
    return fetchData;
}

export default ScrapingDataNode