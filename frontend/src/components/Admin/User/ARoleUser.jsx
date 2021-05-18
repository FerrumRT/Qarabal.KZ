import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getAllRoles } from "../../../actions/roleAction";
import { addRemoveRole } from "../../../actions/userAction";

export default function RoleUser(){

  useEffect(()=>{
    getAllRoles()(dispatch, reducers);
  }, [])

  const id = useParams();

  const history = useHistory();

  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  return(
    <>
      <h3 className="mt-3">User Roles</h3>
      {reducers.role.list?reducers.role.list.map((role)=>
      {
        return(<Form.Check
        key={role.id}
        type="switch"
        id={`switch-${role.role}`}
        label={role.role}
        disabled={reducers.user.details.email === reducers.user.one.email && role.role==="ROLE_ADMIN"}
        checked={reducers.user.one.roles?reducers.user.one.roles.some(({"role" : r})=>r === role.role)?"checked":"":""}
        onClick={()=>{
          addRemoveRole(id.id, role.id)(dispatch, reducers);
        }}
      />)}):""}
    </>
  )
}