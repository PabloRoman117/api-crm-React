import React from "react";
const Alerta = ({children }) => {
  return    (     
<div role="alert">

  <div class="border border-solid border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700 mt-5 uppercase text-center">
    <p>{children}.</p>
  </div>
</div>
  )}

export default Alerta;
