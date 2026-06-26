import React, { useState, useEffect } from "react";

const EmployeeDirectory = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("All");
    const [loading, setloading] = useState(true);
    const [sort, setSort] = useState("default");

    useEffect(() => {
        const userdata = async () => {
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            setUsers(data.users)
            setloading(false);
        }
        userdata();
    }, [])

    const filtereddata = users.filter((emp) => {
        const fullName = `${emp.firstName} ${emp.lastName}`;

        const searchfilter = fullName.toLowerCase().includes(search.toLowerCase()) || emp.email.toLowerCase().includes(search.toLowerCase());
        const searchgender = gender === "All" || emp.gender === gender;

        return searchfilter && searchgender;
    })

    const sorteddata = [...filtereddata];
    if (sort === "Age asc") {
        sorteddata.sort((a, b) => a.age - b.age);
    } else if (sort === "Age des") {
        sorteddata.sort((a, b) => b.age - a.age);
    } else if (sort === "Name asc") {
        sorteddata.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sort === "Name des") {
        sorteddata.sort((a, b) => b.firstName.localeCompare(a.firstName))
    }

    if (loading) {
        return (<> <h1>spinner-border</h1>
        <h1 className="text-info">loading.......</h1></>);
    }
    return (
        <>
            <div className="mt-2">
                <h2 className="fw-bold">Employee Directory System</h2>

                <div className="d-flex mt-3">
                    <input
                        className="form-control border-info w-50 ms-3 me-2"
                        type="text"
                        placeholder="Enter search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border-info w-25 me-3"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <select
                        className="border-info w-25 me-3"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="Age asc">Age Low-High</option>
                        <option value="Age des">Age High-Low</option>
                        <option value="Name asc">A-Z</option>
                        <option value="Name des">Z-A</option>
                    </select>
                </div>

                {sorteddata.length > 0 ? (
                    <table className="table table-bordered table-striped mt-4">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Company</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorteddata.map((emp, index) => (
                                <tr key={emp.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {emp.firstName} {emp.maidenName} {emp.lastName}
                                    </td>
                                    <td>{emp.email}</td>
                                    <td>{emp.age}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.company.name}</td>
                                    <td>{emp.company.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-3">No Data Found</p>
                )}
            </div>
        </>
    )
}
export default EmployeeDirectory;

