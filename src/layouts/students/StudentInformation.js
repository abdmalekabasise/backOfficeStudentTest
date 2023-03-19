/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// react
import { useState } from "react";

// react redux
import { useDispatch } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import AlertDialog from "components/AlertDialog";
import { banExam , getExams} from "store/exams-slice";
import { color } from "@mui/system";


let columns, rows;
let examId;


function StudentInformation(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const[content,setContent]=useState('');
  const[button2,setbutton2]=useState('');
  const deleteSelection = () => {
    setShowDialog(true);
    setContent('Are you sure you want to ban this student? This will be not allowed to have access!.');
    setbutton2('Ban')
  };


  const allowSelection = () => {
    setShowDialog(true);
    setContent('Are you sure you want to allow this student? This will be  allowed to have access!.');
    setbutton2('Allow')
  };


  const dispatch = useDispatch();

  columns = [
    { Header: "userName", accessor: "student", align: "left" },
    { Header: "firstName", accessor: "email", align: "left" },
    { Header: "lastName", accessor: "phone", align: "left" },
    { Header: "email", accessor: "gender", align: "left" },
    { Header: "State", accessor: "state", align: "left" },
    
    { Header: "action", accessor: "action", align: "center" },
  ];
  rows =
    props.students?.length > 0 &&
    props.students?.map((student) => {
      return {
        student: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {student.userName}
          </MDTypography>
        ),
        email: (
          <MDTypography display="block" variant="inherit" fontWeight="light">
            {student.firstName}
          </MDTypography>
        ),
        phone: (
          <MDTypography display="block" variant="inherit" fontWeight="regular">
            {student.lastName}
          </MDTypography>
        ),

        gender: (
          <MDTypography display="block" variant="inherit" fontWeight="regular">
            {student.email}
          </MDTypography>
        ),
        state: (
          <MDTypography display="block" variant="inherit" fontWeight="regular" >
            {student.allowed &&(
              <span >Student allowed</span>
            ) }
            {!student.allowed &&(
              <span>Student banned</span>
            ) }
          </MDTypography>
          ),
        action: (
          <MDBox>
{student.allowed && (
          <MDButton
            variant="text"
            color={"error"}
            onClick={() => {
              examId = student.id;
              deleteSelection();
            }}
          >
              <><Icon>block</Icon><span>&nbsp;Ban </span></>
            
            
          </MDButton>
)}
          {!student.allowed && (
          <MDButton
            variant="text"
            color={"success"}
            onClick={() => {
              examId = student.id;
              allowSelection();
            }}
          >
              <><Icon>doneoutline</Icon><span>&nbsp;Allow </span></>
            
          </MDButton>
          )}
        </MDBox>
        ),
      };
    });

    const handleSubmit = async () => {
    

     const res = await dispatch(banExam(examId));
    if (res === true) {
      examId = null;
      await dispatch(getExams());
      window.location.reload(false);

    }
    };

  return (
    <>
     {showDialog && (
        <AlertDialog
          title={`Are you sure?`}
          content={content}
          button1={`Close`}
          button2={button2}
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
            examId = null;
          }}
          handleSubmit={handleSubmit}
        />
      )}
      {props.students?.length > 0 ? (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    mt={1}
                  >
                    Students
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <MDBox pt={6} pb={3}>
          <MDTypography
            display="block"
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            No rows added yet...
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

export default StudentInformation;
