// react-router-dom components
import { useNavigate } from "react-router-dom";

// react
import { useEffect, useState } from "react";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// date-fns
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Hooks
import useFormInput from "hooks/form-input";

// Store
import { addExam } from "store/exams-slice";
import { getSubjects } from "store/subjects-slice";
import { CircularProgress } from "@mui/material";

export default function AddExam() {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subjects?.subjects);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState();
  const handleSubjectChange = (event, value) => {
    setSelectedSubject(value);
  };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getSubjects());
      setIsLoading(false);
    };

    getData();

    return () => {};
  }, []);

  const {
    value: title,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    hasError: titleHasError,
    resetinput: resettitle,
  } = useFormInput((value) => value.trim() !== "");



  



  

  

  const resetForm = () => {
    resettitle();
  };

  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

   

    

    const res = await dispatch(
      addExam({
        title,
        subject: selectedSubject,
      })
    );

    if (res === true) {
      resetForm();
      navigate("/exams");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={10} pb={3}>
        <Grid>
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
                Add Exam
              </MDTypography>
            </MDBox>
            {isLoading && (
              <MDBox display="flex" justifyContent="center" m={5}>
                <CircularProgress />
              </MDBox>
            )}
            {!isLoading && (
              <MDBox pt={4} pb={3} px={3}>
                <form onSubmit={formSubmitHandler}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        required
                        autoFocus
                        type="text"
                        label="Exam Title"
                        htmlFor="title"
                        variant="standard"
                        value={title}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                        fullWidth
                        error={titleHasError}
                        success={!titleHasError}
                      />
                      {titleHasError && (
                        <MDTypography variant="caption" color="error">
                          Please enter exam title.
                        </MDTypography>
                      )}
                    </Grid>

                    

                 

                   

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        required
                        id="subject"
                        value={selectedSubject?.name}
                        onChange={handleSubjectChange}
                        options={subjects}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField {...params} label="Subject" />
                        )}
                      />
                    </Grid>

                    

                  

                    <Grid item xs={12} md={12}>
                      <MDBox
                        justifyContent="flex-end"
                        display="flex"
                        my={4}
                        mr={1}
                      >
                        <MDButton variant="gradient" color="dark" type="submit">
                          Add exam
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            )}
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
