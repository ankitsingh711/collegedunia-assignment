import Table from '../../components/Table';
import DataTable from '../../Data/index.json';
import { useState, useEffect } from 'react';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(DataTable);

    function handleSearch(e) {
        setSearchTerm(e?.target?.value);
        let filteredData = data.filter((data) => {
            return data.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        })
        setData(filteredData);
    }

    function handleSortByFees(e) {
        const selectedFees = e.target.value;

        let filteredData = data.filter((college) => {
            if (!selectedFees) return true;
            const prices = selectedFees.split('-');
            const lowest = parseInt(prices[0]);
            const highest = parseInt(prices[1]);
            const collegePrice = parseInt(college.course_fee.price);
            return collegePrice >= lowest && collegePrice <= highest;
        });
        setData(filteredData);
    };

    function handleSortByRating(e) {
        const selectedRating = e.target.value;

        let filteredData = data.filter((college) => {
            if (!selectedRating) return true;
            const prices = selectedRating.split('-');
            const lowest = parseInt(prices[0]);
            const highest = parseInt(prices[1]);
            const collegeRating = parseInt(college.user_reviews.rating);
            return collegeRating >= lowest && collegeRating <= highest;
        });
        setData(filteredData);
    }

    function handleUserReviewSort(e){
        const order = e?.target?.value;
        let filteredData;
        if(order==="asc"){
            filteredData = data.sort((a,b)=> {return parseInt(a.user_reviews.user_count)-parseInt(b.user_reviews.user_count)});
        }else if(order==="desc"){ 
            filteredData = data.sort((a,b)=> {return parseInt(b.user_reviews.user_count)-parseInt(a.user_reviews.user_count)});
        }
        setData(filteredData);
    }


    function handleAscendingOrder(){
        let filteredData = data.sort((a, b)=> { return a.name - b.name});
        setData(filteredData);
    console.log(data)
    }

    function handleDescendingOrder(){
        let filteredData = data.sort((a, b)=> { return b.name - a.name});
        setData(filteredData);
    console.log(data)

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
                <button onClick={() => handleAscendingOrder}>Asc Order</button>
                <button onClick={() => handleDescendingOrder}>Desc Order</button>
            </div>
            <div className='home_page_table__section'>
                <Table data={data} loading={loading} />
            </div>
        </div>
    )
}

export default Home;