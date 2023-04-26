import { Link } from "react-router-dom";
import { logOut } from "../utilities/users-service";
//see useParams for navigation that looks more like Express navigation
//with a NavLink element, you can style hyperlinks dynamically

//?remember, you can destructure this way instead of passing 'props' and then creating variable with 'const {user} = props'
function NavBar({ user, setUser }) {
    //create function for Logout
    const handleLogOut = () => {
        //delegate to the users-service
        logOut();
        //update state and cause a re-render
        setUser(null);
    };
    return (
        <nav>
            {/**note: if you inspect elements, the Link tag will appear as <a>*/}
            <Link to="/orders">Order History</Link>
            {/**this is a pre-styling placeholder for readability: non-breaking space + line + non-breaking space */}
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link> 
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}</span>{" "}
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>
                Logout
            </Link>
        </nav>
    );
}

export default NavBar;
