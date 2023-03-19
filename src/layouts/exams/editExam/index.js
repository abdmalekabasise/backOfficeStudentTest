// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

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

// Custom components
import Notification from "examples/Notification";
import Questions from "../components/Questions";

// Store
import { editExam, getExam } from "store/exams-slice";
import { getSubjects } from "store/subjects-slice";
import { notificationActions } from "store/notification-slice";

export default function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    value: title,
    setValue: titleSetValue,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    hasError: titleHasError,
  } = useFormInput((value) => value.trim() !== "");

 


  

  

  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const examsSlice = useSelector((state) => state.exams);

  const subjects = useSelector((state) => state.subjects?.subjects);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedSubject, setSelectedSubject] = useState();
  const handleSubjectChange = (event, value) => {
    setSelectedSubject(value);
  };

  useEffect(() => {
    const getData = async () => {
      const subjectsData = await dispatch(getSubjects());
      const data = await dispatch(getExam(id));

      if (data && data.exam) {
        titleSetValue(data.exam.title);
        setSelectedSubject(data.exam.subject);
        setSelectedSubject(() =>
          subjectsData.find((s) => s.id === data.exam.subject._id)
        );
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

  
    if (titleHasError ) {
      alert("Please fill the field");
      return;
    }

    const res = await dispatch(
      editExam({
        id,
        title,
        subject: selectedSubject,
      })
    );

    if (res === true) {
      navigate("/exams");
    }
  };

  return (
    <DashboardLayout>
      <>
        {notificationSlice.open && (
          <Notification
            color={`${notificationSlice.color}`}
            text={notificationSlice.message}
            onClose={() => dispatch(notificationActions.closeOpen())}
            open={notificationSlice.open}
          />
        )}
      </>

      <DashboardNavbar />
      <Grid pt={10} pb={3} container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="dark"
              borderRadius="lg"
              coloredShadow="info"
              mx={4}
              mt={-3}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Edit Exam
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {isLoading && (
                <MDBox display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </MDBox>
              )}
              {!isLoading &&
                (examsSlice.exam ? (
                  <form onSubmit={formSubmitHandler}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={12}>
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

                      

                    

                  


                      <Grid item xs={12} md={12}>
                        <Autocomplete
                          required
                          id="subject"
                          value={selectedSubject?.name}
                          onChange={handleSubjectChange}
                          // inputValue={selectedSubject?.name}
                          options={subjects}
                          getOptionLabel={(option) => option.name ?? option}
                          renderInput={(params) => (
                            <TextField {...params} label="Subject" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MDButton
                          variant="gradient"
                          color="dark"
                          type="submit"
                          fullWidth
                        >
                          Save Changes
                        </MDButton>
                      </Grid>
                    </Grid>
                  </form>
                ) : (
                  <MDTypography variant="caption">
                    Exam not found! Please try again.
                  </MDTypography>
                ))}
            </MDBox>
          </Card>
        </Grid>
        {isLoading && (
          <MDBox display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </MDBox>
        )}
        {!isLoading &&
          (examsSlice.exam ? (
            <Grid item xs={12} md={9}>
              <Questions
                questions={
                  examsSlice.exam.questions &&
                  examsSlice.exam.questions.length > 0 &&
                  examsSlice.exam.questions
                }
              />
            </Grid>
          ) : (
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="caption">
                Exam not found! Please try again.
              </MDTypography>
            </MDBox>
          ))}
      </Grid>
    </DashboardLayout>
  );
}
