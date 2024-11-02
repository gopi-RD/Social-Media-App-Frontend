import {Link} from "react-router-dom"
import "./index.css"
const navRoutes=[
    {   id:1,
        path:"/",
        label:"Home",
        imageUrl:"https://img.icons8.com/?size=100&id=83326&format=png&color=000000"
    },
    {   id:2,
        path:"/create-post",
        label:"create",
        imageUrl:"https://img.icons8.com/?size=100&id=1501&format=png&color=000000"
    },
    {   id:3,
        path:"/search-users",
        label:"Search",
        imageUrl:"https://img.icons8.com/?size=100&id=132&format=png&color=000000"
    },
    {    id:4,
         path:"/profile",
         label:"Profile",
         imageUrl:"https://img.icons8.com/?size=100&id=7820&format=png&color=000000"
    }
]

const NavBar=()=>{

    return (


        <div>
            <ul className="routes-list">
                {
                    navRoutes.map(route=>(
                        <li className="route-item" key={route.id}>
                            <Link className="route-link" to={route.path}>
                                <img src={route.imageUrl} alt={route.label} className="route-img" />
                            </Link> 
                        </li>
                    ))   
                }
            </ul>
        </div>

    )

}


export default NavBar;
