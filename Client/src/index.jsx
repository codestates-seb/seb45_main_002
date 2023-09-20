import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(`    /|    / /                                                                                 
   //|   / /              __  ___     __       ( )      ___         __     __  ___     ___    
  // |  / /     //   / /   / /      //  ) )   / /     //___) )   //   ) )   / /      ((   ) ) 
 //  | / /     //   / /   / /      //        / /     //         //   / /   / /        \\ \\     
//   |/ /     ((___( (   / /      //        / /     ((____     //   / /   / /      //   ) )`);

console.log(`                                                                     
                                                                     
    //   ) )                                                         
   //            ___        ___   /      ___        __        ___    
  //           //   ) )   //   ) /     //___) )   //  ) )   ((   ) ) 
 //           //   / /   //   / /     //         //          \\ \\     
((____/ /    ((___/ /   ((___/ /     ((____     //        //   ) )`);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
