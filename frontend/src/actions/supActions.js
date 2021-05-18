import * as action_types from "../action_types";

export const removeErrMess = () => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.ERR_MESS, "data" : ""})
}

export const removeSuccessMess = () => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.SUCCESS_MESS, "data" : ""})
}

export const setSuccessMess = (mess) => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.SUCCESS_MESS, "data" : mess})
  setTimeout(()=>{removeSuccessMess()(dispatch, reducers)}, 3000)
}

export const setErrMess = (mess) => async(dispatch, reducers) => {
  await dispatch({"type" : action_types.ERR_MESS, "data" : mess})
  setTimeout(()=>{removeErrMess()(dispatch, reducers)}, 3000)
}