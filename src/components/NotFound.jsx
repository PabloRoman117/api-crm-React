import React from 'react';

const NotFound = () => {
  return <div class="px-40 py-20 bg-white rounded-xl shadow-xl">
        <div class="flex flex-col items-center">
    <h1 class="font-bold text-blue-800 text-9xl">404</h1>

    <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
      <span class="text-red-500">Oops!</span> Pagina no encontrada
    </h6>

    <p class="mb-8 text-center text-gray-500 md:text-lg">
      El Cliente no existe.
    </p>
    </div></div>;
};

export default NotFound;
