import React from "react";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { styled } from '@mui/system';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../Utility/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Sidebar from "../common/SideBar";
import { CircularProgress } from "@mui/material";
import coverImage from '../resources/coverpage.jpg';



export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "users");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUsertype, setEditUsertype] = useState("");
  const [editAgegroup, setEditagegroup] = useState("");
  const [editIntake, setEditIntake] = useState("");
  const [editDegree, setEditDegree] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editContactNo, setEditContactNo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

  const PageContainer = styled('div')({
    background: `url(${coverImage})`, // Replace with the actual path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const openEditModal = (user) => {
    setEditModalOpen(true);
    setEditUser(user);
    setEditName(user.name);
    setEditUsertype(user.usertype)
    setEditagegroup(user.agegroup)
    setEditIntake(user.intake)
    setEditDegree(user.degree)
    setEditDepartment(user.department)
    setEditContactNo(user.contactno)

  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditUser(null);
    setEditName("");
  };

  const updateUserData = async () => {
  if (editUser) {
    const userDoc = doc(db, "users", editUser.id);
    await updateDoc(userDoc, { name: editName , usertype: editUsertype , agegroup: editAgegroup, intake: editIntake, degree: editDegree, department: editDepartment, contactno: editContactNo});
    Swal.fire("Updated!", "User data has been updated.", "success");
    closeEditModal();
    getUsers();
  }
};

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  return (
    <>
  <Sidebar title="Edit / Delete Quiz" />
  <PageContainer>
  <Modal open={loading} onClose={() => {}}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <CircularProgress color="primary" size={80} />
        <Typography
          variant="h6"
          component="div"
          style={{ marginTop: "20px", color: "#fff" }}
        >
          Loading...
        </Typography>
      </div>
    </div>
  </Modal>
  {!loading && rows.length > 0 && (
    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        List of Users
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.name || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Users" />
          )}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        {/* <Button variant="contained" endIcon={<AddCircleIcon />}>
          Add
        </Button> */}
      </Stack>
      <Box height={10} />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                User Type
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Age Group
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Intake
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Degree
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Department
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Contact Number
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell align="left">{row.usertype}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.agegroup}</TableCell>
                    <TableCell align="left">{row.intake}</TableCell>
                    <TableCell align="left">{row.degree}</TableCell>
                    <TableCell align="left">{row.department}</TableCell>
                    <TableCell align="left">{row.contactno}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color                            : "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => openEditModal(row)}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteUser(row.id);
                          }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )
    }

      
  </PageContainer>
  <Modal open={editModalOpen} onClose={closeEditModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Edit User
        </Typography>
        <TextField
          label="Usertype"
          value={editUsertype}
          onChange={(e) => setEditUsertype(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age Grou["
          value={editAgegroup}
          onChange={(e) => setEditagegroup(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Intake"
          value={editIntake}
          onChange={(e) => setEditIntake(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Degree"
          value={editDegree}
          onChange={(e) => setEditDegree(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department"
          value={editDepartment}
          onChange={(e) => setEditDepartment(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact No"
          value={editContactNo}
          onChange={(e) => setEditContactNo(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <Button variant="contained" onClick={updateUserData}>
          Update
        </Button>
      </Box>
    </Modal>
    </>
  );
}
