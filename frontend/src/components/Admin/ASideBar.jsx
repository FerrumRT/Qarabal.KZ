import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function SideBar(){

  const history = useHistory();
  const reducers = useSelector(state=>state);
  const dispatch = useDispatch();

  return(
    <div className="col-4">
      <div className="card" style={{"border":" 0",backgroundColor:`rgba(0, 0, 0, 0)`}}>
        <ul className="list-group list-group-flush" style={{backgroundColor:`rgba(255, 255, 255, 0.3)`}}>
          <Link to="/admin/films" style={{"color":"#fff"}}><li className="list-group-item" style={history.location.pathname==="/admin/films"?{backgroundColor:`rgba(255, 255, 255, 0.3)`}:{backgroundColor:`rgba(0, 0, 0, 0.3)`}}>Film</li></Link>
          <Link to="/admin/genres" style={{"color":"#fff"}}><li className="list-group-item" style={history.location.pathname==="/admin/genres"?{backgroundColor:`rgba(255, 255, 255, 0.3)`}:{backgroundColor:`rgba(0, 0, 0, 0.3)`}}>Genres</li></Link>
          <Link to="/admin/authors" style={{"color":"#fff"}}><li className="list-group-item" style={history.location.pathname==="/admin/authors"?{backgroundColor:`rgba(255, 255, 255, 0.3)`}:{backgroundColor:`rgba(0, 0, 0, 0.3)`}}>Authors</li></Link>
          {reducers.user.is_admin?<Link to="/admin/users" style={{"color":"#fff"}}><li className="list-group-item" style={history.location.pathname==="/admin/users"?{backgroundColor:`rgba(255, 255, 255, 0.3)`}:{backgroundColor:`rgba(0, 0, 0, 0.3)`}}>Users</li></Link>:""}
          </ul>
      </div>
    </div>
  )
}