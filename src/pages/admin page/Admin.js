import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { CWidgetStatsC } from "@coreui/react";
import MaterialTable from "material-table";
import { Delete, Edit } from "@material-ui/icons";

const Admin = () => {
  const [counterInfo, setCounterInfo] = useState({});
  const [theatresData, setTheatresData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const [showTheatresTable, setShowTheatresTable] = useState(true);
  const [showMoviesTable, setShowMoviesTable] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);

  const fetchMoviesData = () => {
    //make an api call
    //fetch  list of movies
    //update movie state
    //update the counter info state

    const dataFromAPI = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    setMoviesData(dataFromAPI);
    counterInfo.movie = dataFromAPI.length;
    setCounterInfo(counterInfo);
  };

  const fetchUsersData = () => {
    //make an api call
    //fetch list of users data
    //update users state
    //update the counter info state

    const dataFromAPI = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      1,
      2,
      3,
      4,
      56,
      7,
      8,
      9,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      1,
      2,
      3,
      4,
      56,
      7,
      8,
      9,
    ];

    setUsersData(dataFromAPI);
    counterInfo.user = dataFromAPI.length;
    setCounterInfo(counterInfo);
  };

  const fetchTheatresData = () => {
    //make an api call
    //get theraters list
    //update theatres list
    //update the counter info state

    const dataFromAPI = [
      {
        name: "PVR",
        city: "Delhi",
        description: "Multi screen cinema",
        pinCode: 523108,
      },
      {
        name: "INOX",
        city: "Mumbai",
        description: "Gold Cinema",
        pinCode: 523108,
      },
    ];

    setTheatresData(dataFromAPI);
    counterInfo.theatre = dataFromAPI.length;
    setCounterInfo(counterInfo);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchTheatresData();
      fetchMoviesData();
      fetchUsersData();
    }, 2000);
  }, []);

  const showTheatres = () => {
    setShowTheatresTable(true);
    setShowMoviesTable(false);
    setShowUsersTable(false);
  };

  const showMovies = () => {
    setShowTheatresTable(false);
    setShowMoviesTable(true);
    setShowUsersTable(false);
  };

  const showUsers = () => {
    setShowTheatresTable(false);
    setShowMoviesTable(false);
    setShowUsersTable(true);
  };

  return (
    <div>
      <Navbar />

      <div className="text-center mt-2">
        <h3 className="text-center">
          {" "}
          Welcome {localStorage.getItem("name")} !
        </h3>
      </div>

      <div className="px-5">
        <p className="text-center text-danger">
          Take a quick look at your stats below
        </p>
        {/* <div className="container"> */}
        <div className=" row px-5 ">
          <div className="col">
            <CWidgetStatsC
              className=" text-white fw-bolder"
              icon={<i className="bi bi-card-list text-warning"></i>}
              color="danger"
              inverse
              progress={{ color: "secondary", value: counterInfo.theatre }}
              text="Number of theatres"
              title="Theatres"
              value={counterInfo.theatre}
              onClick={showTheatres}
            />
          </div>

          <div className="col">
            <CWidgetStatsC
              className=" text-white fw-bolder"
              icon={<i className="bi bi-card-list text-warning"></i>}
              color="dark"
              inverse
              progress={{ color: "secondary ", value: counterInfo.movie }}
              text="Number of Movies"
              title="Movies"
              value={counterInfo.movie}
              onClick={showMovies}
            />
          </div>

          <div className="col ">
            <CWidgetStatsC
              className="mb-3 text-white fw-bolder"
              icon={<i className="bi bi-card-list text-warning"></i>}
              color="secondary"
              inverse
              progress={{ color: "dark", value: counterInfo.user }}
              text="Number of Users"
              title="Users"
              value={counterInfo.user}
              onClick={showUsers}
            />
          </div>
        </div>
        {/* </div> */}

        <div>
          {showTheatresTable && (
            <div>
              <MaterialTable
                title="THEATRES"
                columns={[
                  { title: "Theatre name", field: "name" },
                  { title: "City", field: "city" },
                  { title: "Descriptions", field: "description" },
                  { title: "Pin code", field: "pinCode" },
                ]}
                data={theatresData}
                actions={[
                  {
                    icon: Delete,
                    tooltip: "Delete theatre",
                    onClick: (event, rowData) => {
                      // Do save operation
                    },
                  },
                  {
                    icon: Edit,
                    tooltip: "Edit theatre",
                    onClick: (event, rowData) => {
                      // Do save operation
                    },
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,

                  headerStyle: {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                  rowStyle: {
                    backgroundColor: "#eee",
                  },
                }}
              />
            </div>
          )}
          {showMoviesTable && <h1>Movies table</h1>}
          {showUsersTable && <h1>Users table</h1>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
