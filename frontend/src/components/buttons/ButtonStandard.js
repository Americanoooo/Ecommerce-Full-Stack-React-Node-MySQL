import React from "react";
import { Link } from "react-router-dom";

export default function ButtonStandard({ title, linkTo }) {
  return (
    <Link to={`/${linkTo}`}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        {title}
      </button>
    </Link>
  );
}