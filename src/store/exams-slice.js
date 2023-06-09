import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";
import axios from 'axios';


const examsSlice = createSlice({
  name: "exams",
  initialState: {
    exams: [],
    exam: null,
    isSubmitting: false,
  },
  reducers: {
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearExam: (state) => {
      state.exam = null;
      console.log(`Clearing exam ${state.exam}`);
    },
  },
});

export const examsActions = examsSlice.actions;

export const getExams = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/`,
      method: `GET`,
      body: {},
      functionName: `Exams`,
    });

    if (data) {
      console.log(`Set exams :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(examsActions.setExams(data.exams));
      return data.exams;
    }
  } catch (error) {
    console.log(`Error while getting exams :======> ${error}`);
  }
};

export const getStudentExams = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/exams/${id}`,
      method: `GET`,
      body: {},
      functionName: `Exams`,
    });

    if (data) {
      console.log(
        `Set available exams :========> ${JSON.stringify(data, null, 4)}`
      );
      dispatch(examsActions.setExams(data.exams));
      return true;
    }
  } catch (error) {
    console.log(`Error while getting exams :======> ${error}`);
  }
};

export const getExam = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/${id}`,
      method: `GET`,
      functionName: `Exam`,
    });

    if (data) {
      console.log(`Set exam :========> ${JSON.stringify(data.exam, null, 4)}`);
      dispatch(examsActions.setExam(data.exam));
      return data;
    }
  } catch (error) {
    console.log(`Error while getting exam :======> ${error}`);
    return false;
  }
};

export const getQuestion = (id, questionId) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/${id}/question/${questionId}`,
      method: `GET`,
      functionName: `Question`,
    });

    if (data) {
      console.log(`Set question :========> ${JSON.stringify(data, null, 4)}`);
      return data;
    }
  } catch (error) {
    console.log(`Error while getting exam :======> ${error}`);
    return false;
  }
};

export const addExam =
  ({ title, subject }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/add`,
        method: `POST`,
        body: JSON.stringify({
          title,
          subject,
          
        }),
        functionName: `Exam`,
      });

      if (data) {
        console.log(`Added exam :========> ${JSON.stringify(data, null, 4)}`);
        return true;
      }
    } catch (error) {
      console.log(`Error while adding exam :======> ${error}`);
      return false;
    }
  };

export const addQuestion =
  ({ id, question,question2,  options, imageUrl, answer }) =>
  async (dispatch, getState) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('question', question);
    formData.append('question2', question2);
    formData.append('options', options);
    formData.append('imageUrl', imageUrl);
    formData.append('answer', answer);
    console.log(`Adding image :========> ${imageUrl}`);
    try {/*
       sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/add-question`,
        method: `POST`,
        body: JSON.stringify({
          id,
          question,
          question2,
          options,
          imageUrl,
          answer,
        }),
        functionName: `Question`,
      });*/


      const data = await  axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/exams/add-question`, formData, {
        }).then(res => {
            console.log(res);
            if (res) {
              
              return true;
            }
        })
        return true;
      
    } catch (error) {
      console.log(`Error while adding exam :======> ${error}`);
      return false;
    }
  };

export const editExam =
  ({ id, title,  subject }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/edit`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          title,
          subject,
        }),
        functionName: `Exam`,
      });

      if (data) {
        console.log(`Updated exam :========> ${JSON.stringify(data, null, 4)}`);
        return true;
      }
    } catch (error) {
      console.log(`Error while updating exam :======> ${error}`);
      return false;
    }
  };

export const editQuestion =
  ({ id, questionId, question, description, imageUrl, answer, options }) =>
  async (dispatch, getState) => {
    try {
      const data = await   sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/edit-question`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          questionId,
          question,
          description,
          imageUrl,
          answer,
          options,
        }),
        functionName: `Exam`,
      });

  

       

      if (data) {
        console.log(`Updated exam :========> ${JSON.stringify(data, null, 4)}`);
        return true;
      }
    } catch (error) {
      console.log(`Error while updating exam :======> ${error}`);
      return false;
    }
  };

export const deleteExam = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/delete/`,
      method: `DELETE`,
      body: JSON.stringify({
        id,
      }),
      functionName: `exam`,
    });

    if (data) {
      console.log(`Deleted exam :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(getExams());
      return true;
    }
  } catch (error) {
    console.log(`Error while deleting exams :======> ${error}`);
    return false;
  }
};

export const banExam = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/ban/${id}`,
      method: `PUT`,
      
      functionName: `exam`,
    });

    if (data) {
      console.log(`Deleted exam :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(getExams());
      return true;
    }
  } catch (error) {
    console.log(`Error while deleting exams :======> ${error}`);
    return false;
  }
};

export const deleteQuestion =
  (id, questionId) => async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/delete-question`,
        method: `DELETE`,
        body: JSON.stringify({
          id,
          questionId,
        }),
        functionName: `Question`,
      });

      if (data) {
        console.log(`Deleted exam :========> ${JSON.stringify(data, null, 4)}`);
        dispatch(getExam(id));
        return true;
      }
    } catch (error) {
      console.log(`Error while deleting exams :======> ${error}`);
      return false;
    }
  };

export default examsSlice;
