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
  const empCollectionRef = collection(db, "Quizzes");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  // const [editName, setEditName] = useState("");
  // const [editUid, setEditUid] = useState("");
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: '',
    uid:''
  });

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
    setValues({
      name: user.title,
      uid: user.description
    })
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditUser(null);
    setValues({
      name: '',
      uid: ''
    })
    // setEditName("");
    // setEditUid("");
  };

  const updateUserData = async () => {
  if (editUser) {
    // const userDoc = doc(db, "users", editUser.id);
    // await updateDoc(userDoc, { name: values.name, uid: values.uid });
    // Swal.fire("Updated!", "User data has been updated.", "success");
    console.log(values.name,values.uid)
    closeEditModal();
    // getUsers();
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "Quizzes", id);
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
        Quizzes List
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
            <TextField {...params} size="small" label="Search Products" />
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
                Title
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Description
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Subject
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Level
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
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.subject}</TableCell>
                    <TableCell align="left">{row.level}</TableCell>
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
          name="name"
          label="name"
          defaultValue={values.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="uid"
          label="UID"
          defaultValue={values.uid}
          onChange={handleChange}
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