import { Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const [DataUser, setDataUser] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Diploma Engg");

  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const fetch = async () => {
    let url = `http://localhost:8000/userlist/${selectedOption}`;
    try {
      const { data } = await axios.get(url);
      setDataUser(data.data);
    } catch (error) {}
  };

  const HandleView = (uuid, _id) => {
    navigate(`/user/update/${_id}/${uuid}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "S NO",
      cellClassName: "name-column--cell",
      width: 10,
    },
    {
      field: "Rank",
      headerName: "Rank",
      cellClassName: "name-column--cell",
      width: 10,
    },
    {
      field: "Registration",
      headerName: "Registration",
      cellClassName: "name-column--cell",
      width: 100,
    },
    {
      field: "Name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      width: 120,
    },
    {
      field: "Course",
      headerName: "Course",
      cellClassName: "name-column--cell",
      width: 150,
    },

    {
      field: "Cateogry",
      headerName: "Cateogry",
      cellClassName: "name-column--cell",
      width: 100,
    },
    {
      field: "Gender",
      headerName: "Gender",
      cellClassName: "name-column--cell",
      width: 70,
    },
    {
      field: "DOB",
      headerName: "DOB",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Addhaar",
      headerName: "Addhaar",
      cellClassName: "name-column--cell",
      width: 140,
    },
    {
      field: "Percentage",
      headerName: "Percentage",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Mobile",
      headerName: "Student MobileNo",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "view",
      headerName: "View",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            className="cursor-pointer"
            m="0 0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={"green"}
            borderRadius="4px"
            onClick={() => {
              HandleView(row.view, row.Course);
            }}
          >
            {<RemoveRedEyeIcon />}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    fetch();
  }, [selectedOption]);

  return (
    <Box m="0px 10px 10px 10px">
      {/* <Header title="Alumni Request" subtitle="Managing the Member" /> */}
      <div className="m-4 flex justify-center">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center p-2 rounded-lg border ${
              selectedOption === "Diploma Engg Lateral Entry"
                ? "border-green-500 bg-green-100"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              id="lateralEntry"
              name="option"
              value="Diploma Engg Lateral Entry"
              checked={selectedOption === "Diploma Engg Lateral Entry"}
              onChange={() => handleOptionChange("Diploma Engg Lateral Entry")}
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded-full"
            />
            <label
              htmlFor="lateralEntry"
              className="ml-2 block text-sm text-gray-900"
            >
              Lateral Entry
            </label>
          </div>
          <div
            className={`flex items-center p-2 rounded-lg border ${
              selectedOption === "Diploma Engg"
                ? "border-green-500 bg-green-100"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              id="diplomaEngg"
              name="option"
              value="Diploma Engg"
              checked={selectedOption === "Diploma Engg"}
              onChange={() => handleOptionChange("Diploma Engg")}
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded-full"
            />
            <label
              htmlFor="diplomaEngg"
              className="ml-2 block text-sm text-gray-900"
            >
              Diploma Engg
            </label>
          </div>
        </div>
      </div>
      <Box
        m="0px 5px 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#ffffff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#963e96",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#74829ee1",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#963e96",
          },
          "& .MuiCheckbox-root": {
            color: `"#f51660" !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={DataUser} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
