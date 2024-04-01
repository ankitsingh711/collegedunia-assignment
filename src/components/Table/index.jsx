const Table = ({ data, loading }) => {
    return (
        <div className="main_table__container">
            <table>
                <thead>
                    <tr>
                        <td>CD Rank</td>
                        <td>Colleges</td>
                        <td>Course Fees</td>
                        <td>Placement</td>
                        <td>User Review</td>
                        <td>Ranking</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => {
                        return (
                            <tr key={data?.id}>
                                <td>{data?.rank}</td>
                                <td>
                                    <div className='college_info'>
                                        {data?.name}<br/>
                                        <span style={{color: "grey", fontSize: "14px"}}>{data.address}</span>
                                    </div>
                                    <div className="college_med">
                                        <div/>
                                        <div>
                                            <span>{data.courses[0]?.name}</span><br />
                                            <span>{data.courses[0]?.label}</span>
                                        </div>
                                    </div>
                                    <div className='collge_button'>
                                        <button> &rarr; Apply Now</button>
                                        <button>Download Broucher</button>
                                        <button>Add to Compare</button>
                                    </div>
                                </td>
                                <td className="course_fee">&#8377;{data?.course_fee.price}<br />
                                    {data?.course_fee.course} <br />
                                    -{data?.course_fee.year} <br />
                                    <span><span>&larr;&rarr;</span>Compare fees</span>
                                </td>
                                <td className="placement">&#8377;{data?.placement?.avg_package}<br />
                                    <span>Average package</span> <br />
                                    {data?.placement?.highest_package} <br />
                                    <span></span>
                                    <span>Compare Placements</span>
                                </td>
                                <td>
                                    <span><span>&#9734;</span>{data.user_reviews?.rating}</span> <br />
                                    <span>Based on {data.user_reviews?.user_count} Reviews</span> <br />
                                    <span style={{color: "pink"}}>&#10003;Based on Social Life</span>
                                </td>
                                <td>
                                    <span>#{data.ranking}</span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {loading && <div>Loading...</div>}
        </div>
    )
}

export default Table;
