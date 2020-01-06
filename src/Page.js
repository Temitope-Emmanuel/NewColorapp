import React from "react"
import "./Page.css"


function Page ({children}){
    // let direction;
    
    return(
        <section className="page">
            {children}
        </section>
    )
}
 


export default Page