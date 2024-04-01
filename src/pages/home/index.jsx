import Table from '../../components/Table';
import DataTable from '../../Data/index.json';
import { useState, useEffect, useRef } from 'react';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(DataTable);
    const [visibleData, setVisibleData] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        setData(DataTable);
        setVisibleData(DataTable.slice(0, 10));
    }, []);

    useEffect(() => {
        const table = tableRef.current;
        table.addEventListener('scroll', handleScroll);
        return () => {
            table.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        const table = tableRef.current;
        if (table.scrollHeight - table.scrollTop <= table.clientHeight+1) {
            setLoading(true);
            loadMoreData();
            setLoading(false)
        }
    };

    const loadMoreData = () => {
        const currentLength = visibleData.length;
        const nextData = data.slice(currentLength, currentLength + 10);
        setVisibleData(prevData => [...prevData, ...nextData]);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let filteredData = DataTable.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm);
        });
        setData(filteredData);
        setVisibleData(filteredData.slice(0, 10));  
    };


    function handleSortByFees(e) {
        const selectedFees = e.target.value;

        let filteredData = DataTable.filter((college) => {
            if (!selectedFees) return true;
            const prices = selectedFees.split('-');
            const lowest = parseInt(prices[0]);
            const highest = parseInt(prices[1]);
            const collegePrice = parseInt(college.course_fee.price.replace(/,/g, ''));
            return collegePrice >= lowest && collegePrice <= highest;
        });
        setData(filteredData);
        setVisibleData(filteredData.slice(0, 10));  
    }


    function handleSortByRating(e) {
        const selectedRating = e.target.value;

        let filteredData = DataTable.filter((college) => {
            if (!selectedRating) return true;
            const ratings = selectedRating.split('-');
            const lowest = parseFloat(ratings[0]);
            const highest = parseFloat(ratings[1]);
            const collegeRating = parseFloat(college.user_reviews.rating);
            return collegeRating >= lowest && collegeRating <= highest;
        });
        setData(filteredData);
        setVisibleData(filteredData.slice(0, 10));  
    }


    function handleUserReviewSort(e) {
        const order = e.target.value;
        let sortedData;
        if (order === "asc") {
            sortedData = [...data].sort((a, b) => parseInt(a.user_reviews.user_count) - parseInt(b.user_reviews.user_count));
        } else if (order === "desc") {
            sortedData = [...data].sort((a, b) => parseInt(b.user_reviews.user_count) - parseInt(a.user_reviews.user_count));
        }
        setData(sortedData);
        setVisibleData(sortedData.slice(0, 10));  
    }



    function extractRankNumber(rank) {
        const match = rank.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }
    
    function handleAscendingOrder() {
        const sortedData = [...data].sort((a, b) => extractRankNumber(a.rank) - extractRankNumber(b.rank));
        setData(sortedData);
        setVisibleData(sortedData.slice(0, 10));  
    }
    
    function handleDescendingOrder() {
        const sortedData = [...data].sort((a, b) => extractRankNumber(b.rank) - extractRankNumber(a.rank));
        setData(sortedData);
        setVisibleData(sortedData.slice(0, 10));  
    }


    return (
        <div className="home_page_main__container">
            <div className='home_page_filter__section'>
                <input placeholder='Search By Collge Name' onChange={(e) => handleSearch(e)} />
                <select name='fees' id='fees' onChange={(e) => handleSortByFees(e)}>
                    <option value="">Sort by Fees</option>
                    <option value="20000-50000">&#8377; 20000-50000</option>
                    <option value="50001-10000">&#8377; 50001-10000</option>
                    <option value="100001-200000">&#8377; 100001-200000</option>
                    <option value="200001-400000">&#8377; 200001-400000</option>
                    <option value="400001-700000">&#8377; 400001-700000</option>
                </select>
                <select name='rating' id='ratings' onChange={(e) => handleSortByRating(e)}>
                    <option value="">Sort by Rating</option>
                    <option value="0-2">0-2</option>
                    <option value="3-5">2-4</option>
                    <option value="6-8">6-8</option>
                    <option value="9-10">9-10</option>
                </select>
                <select name='fees' id='fees' onChange={(e) => handleUserReviewSort(e)}>
                    <option value="">Sort User Review Rating</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
                <button onClick={handleAscendingOrder}>Asc Order</button>
                <button onClick={handleDescendingOrder}>Desc Order</button>
            </div>
            <div className='home_page_table__section' ref={tableRef} style={{overflowY: "auto"}}>
                <Table data={visibleData} loading={loading} />
            </div>
        </div>
    )
}

export default Home;