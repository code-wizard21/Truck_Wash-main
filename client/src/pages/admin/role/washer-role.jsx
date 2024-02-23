import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Http from "../../../utils/http";
// ... Your rows data here
function createData(cname, cnumber) {
  return { cname, cnumber };
}
const rows = [
  createData("INC", " (306) 529.6419"),
  createData("RTC", " (306) 529.6419"),
  createData("IDH", " (306) 529.6419"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 2,
  },
}));

function CollapsibleRow({ row, isMobile }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        {isMobile && (
          <TableCell>
            <IconButton size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}

        <TableCell component="th" scope="row">
          <div className="accept">
            <span> {row.Email}</span>
          </div>
        </TableCell>

        {!isMobile && <TableCell>{row.PhoneNumber}</TableCell>}

        {!isMobile && (
          <>
            <TableCell>
              <IconButton color="secondary" aria-label="add an alarm">
                <ClearIcon />
              </IconButton>
            </TableCell>
          </>
        )}
      </StyledTableRow>
      {isMobile && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="details">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Phone Number
                      </TableCell>
                      <TableCell>
                        <span> {row.PhoneNumber}</span>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>

                      <TableCell align="right">
                        <IconButton color="secondary" aria-label="add an alarm">
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
export default function ResponsiveCollapsibleTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [washerName, setWasherName] = useState("");
  const [washerNumber, setWashNumber] = useState("");
  const [password, setPassword] = useState("");
  const [washerList, setWasherList] = useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    getWasher();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    Http.post("/api/wash/register", {
      name: washerName,
      password: password,
      number: washerNumber,
    })
      .then((data) => {
        console.log("customer");
        getWasher();
      })
      .catch((err) => {});
  };
  const getWasher = () => {
    Http.get("/api/wash/getWasher")
      .then((data) => {
        console.log(data.data);
        setWasherList(data.data);
      })
      .catch((err) => {});
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 }, // Adjust padding for different screen sizes
        // Add additional styling as needed here
      }}
    >
      <Container space={1} padding={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          sx={{ width: 1 }} // makes the Stack take the full width of the Container
        >
          <Box flexGrow={1}></Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            sx={{
              ml: "auto", // move button to the right
              p: 1, // set padding (example: 1)
              m: 1, // set margin (example: 1)
            }}
          >
            New User
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {isMobile && <TableCell />}
                <StyledTableCell>Name</StyledTableCell>

                {!isMobile && (
                  <>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {washerList.map((row) => (
                <CollapsibleRow key={row.id} row={row} isMobile={isMobile} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" }, // adjust the width at different breakpoints
            mx: "auto", // center the box horizontally
          }}
        >
          <Container maxWidth="lg">
            <Typography component="h1" variant="h4" align="center">
              Add Member
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="standard-basic"
                  name="carcode"
                  label="Name"
                  variant="standard"
                  value={washerName}
                  onChange={(e) => setWasherName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="standard-basic"
                  name="carcode"
                  label="Password"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="standard-basic"
                  name="carcode"
                  label="Number"
                  variant="standard"
                  value={washerNumber}
                  onChange={(e) => setWashNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="right" m={1} p={1}>
              <Button variant="contained" color="primary" onClick={handleOk}>
                OK
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}
