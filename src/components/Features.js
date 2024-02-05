import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="w-[75%] mx-auto bg-red-50 rounded-md mt-10 ">
      <div className="w-full flex  bg-slate-700 text-white font-extrabold text-xl p-2 rounded-md shadow-sm justify-between">
        <div className=""> The features are:</div>
        <Link to="/">
          <TiArrowBack title="back to Home" className='flex items-center' />
        </Link>      </div>

      <ul className="ml-4 mt-2 font-semibold p-1 ">
        <li className="m-2">
          A search bar that allows filtering based on any property.
        </li>
        <li className="m-2">
          The ability to edit or delete rows directly in place.
        </li>
        <li className="m-2">
          Highlighting of selected rows, with the option to select one or more
          rows.
        </li>
        <li className="m-2 ">
          Deletion of multiple selected rows simultaneously using the 'Delete
          Selected' button located at the top right bin icon.
        </li>
      </ul>
    </div>
  );
};

export default Features;
