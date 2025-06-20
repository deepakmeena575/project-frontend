import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        allApplicantsForRecruiter:[],
        allAppliedJobs: [],
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setAllApplicantsForRecruiter:(state,action) => {
            state.allApplicantsForRecruiter = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        }
    }
});
export const {setAllApplicants, setAllApplicantsForRecruiter, setAllAppliedJobs} = applicationSlice.actions;
export default applicationSlice.reducer;