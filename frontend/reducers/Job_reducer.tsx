import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Company {
  logoUrl: String;
  name: String; // Not nullable if company is provided
  linkToWebsite: String;
}

interface Requirements {
  education: String;
  experience: String;
  languageProficiency: String;
  salary: String;
  certifications: String;
  interpersonalSkills: String;
  availability: String;
}

interface Job {
  // NOT NULLABLE
  _id: any;
  title: String;
  description: String;
  workplaceType: String;
  employeeLocation: String;
  jobType: String;
  deadline: Date;

  // NULLABLE
  company?: Company;
  requirements?: Requirements;
}

interface Jobs {
  arr: Job[];
}

const initialState: Jobs = {
  arr: [],
};

const JobSlice = createSlice({
  name: 'Job',
  initialState,
  reducers: {
    setJobs: (state: Jobs, action: PayloadAction<any>) => {
      action.payload.map((item: any) => {
        state.arr.push(item);
      });
    },
  },
});
export const {setJobs} = JobSlice.actions;
export default JobSlice.reducer;
