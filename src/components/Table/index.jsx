import { useState } from "react";

const Table = ({ data, loading }) => {

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

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
                    {data.map((data, index) => {
                        const isSelected = index === selectedRow;
                        const hasFeature = data.feature;
                        return (
                            <>
                                <tr key={data?.id} className={isSelected ? 'selected_row' : ''} onClick={() => handleRowClick(index)}>
                                    <td>{data?.rank}</td>
                                    <td>
                                    {hasFeature && <span className="feature__flag">Featured </span>}
                                        <div className='college_info'>
                                            {data?.name}<br />
                                            <span style={{ color: "grey", fontSize: "14px" }}>{data.address}</span>
                                        </div>
                                        <div className="college_med">
                                            <div />
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
                                    <td className="course_fee"><span style={{ color: "#42c6ab", fontWeight: "bold" }}> &#8377; {data?.course_fee.price}</span><br />
                                        {data?.course_fee.course} <br />
                                        -{data?.course_fee.year} <br />
                                        <span><span>&larr;&rarr;</span>Compare fees</span>
                                    </td>
                                    <td className="placement"><span style={{ color: "#42c6ab", fontWeight: "bold" }}> &#8377;{data?.placement?.avg_package}</span><br />
                                        <span>Average package</span> <br />
                                        <span style={{ color: "#42c6ab", fontWeight: "bold" }}> &#8377;{data?.placement?.highest_package}</span>
                                        <br />
                                        <span></span>
                                        <span>Compare Placements</span>
                                    </td>
                                    <td>
                                        <span><span>&#9734;</span>{data.user_reviews?.rating}</span> <br />
                                        <span>Based on {data.user_reviews?.user_count} Reviews</span> <br />
                                        <span style={{ color: "pink" }}>&#10003;Based on Social Life</span>
                                    </td>
                                    <td>
                                        <span>#{data.ranking}</span>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            {loading && <div>Loading...</div>}
        </div>
    )
}

export default Table;
