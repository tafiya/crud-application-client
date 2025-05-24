import { createBrowserRouter } from "react-router";
import App from "../App";
import ProjectTable from "@/components/project/ProjectTable";


const router =createBrowserRouter([
{
    path:"/",
    element:<App></App>,
    // errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:"/",
            element:<ProjectTable></ProjectTable>
        },
        // {
        //     path:"product/:id",
        //     element:<ProductDetails></ProductDetails>
        // },
        // {
        //     path:"product/edit/:id",
        //     element:<EditProductsPage></EditProductsPage>
        // }
    ]
}
])
export default router;