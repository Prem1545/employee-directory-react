import React, { useState, useEffect } from "react";
import  "./EmployeeDirectory.css";

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
        return (<> <div className="text-center mt-5">
      <div className="spinner-border text-info" role="status" >
        
      </div>

      <h2 className="text-info mt-3">Loading...</h2>
    </div></>);
    }
    return (
        <>
            <div className="bg-light min-vh-100 p-3">
                <h2 className="fw-bold text-success">Employee Directory System</h2>

                <div className="container mt-3 employee-directory-filters">
                    <div className="row g-2 align-items-center">
                        <div className="col-12 col-md-5">
                            <input
                                className="form-control border-info"
                                type="text"
                                placeholder="Search name or email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-6 col-md-3">
                            <select className="form-select border-info" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option className="optioncolor" value="All">All</option>
                                <option className="optioncolor" value="male">Male</option>
                                <option className="optioncolor" value="female">Female</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-4">
                            <select className="form-select border-info" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option className="optioncolor" value="default">Default</option>
                                <option className="optioncolor" value="Age asc">Age Low-High</option>
                                <option className="optioncolor" value="Age des">Age High-Low</option>
                                <option className="optioncolor" value="Name asc">A-Z</option>
                                <option className="optioncolor" value="Name des">Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {sorteddata.length > 0 ? (
                    <div className="container table-responsive mt-4">
                        <table className="table table-bordered employee-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
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
                    </div>
                ) : (
                    <p className="mt-3">No Data Found</p>
                )}
            </div>
        </>
    )
}
export default EmployeeDirectory;

