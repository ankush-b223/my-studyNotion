import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    courseSectionData: [],
    courseEntireData:[],
    completedLectures:[],
    totalNoOfLectures: 0,

}

const viewSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action)=>{
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state,action)=>{
            state.courseEntireData = action.payload
        },
        setCompletedLectures: (state,action)=>{
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state,action)=>{
            state.completedLectures = [...state.completedLectures, action.payload]
        },
        setTotalLectures:(state,action)=>{
            state.totalNoOfLectures = action.payload
        }

    }
});

export const {
    setCourseSectionData,
    setEntireCourseData,
    setCompletedLectures,
    updateCompletedLectures,
    setTotalLectures,
    
} = viewSlice.actions

export default viewSlice.reducer