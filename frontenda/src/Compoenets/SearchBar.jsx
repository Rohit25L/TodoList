import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { X } from 'lucide-react';

const SearchBar = () => {
  const [inputVal, setInputVal] = useState("");
  const [searchVal, setSearchVal] = useState();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const id = sessionStorage.getItem("id");
  console.log("input");
  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v2/${id}/search?title=${inputVal}`
        );
        console.log(res.data);
        setSearchVal(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(searchVal>0){
    fun();}
  }, [inputVal]);

  return (
    <div
      className="absolute top-40 left-2/6 shadow-lg shadow-grey-400"
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => {
        setTimeout(() => setIsInputFocused(false), 100);
      }}
    >
      <input
        type="text"
        className="shadow-md bg-white rounded-lg h-20 w-150"
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
      /> <button className="absolute right-3 top-4.5"><X size={40}/></button>
      {isInputFocused &&  (
        <div className="shadow-sm p-4 bg-white rounded-lg h-fit">
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
            Tasks
          </h3>
          <ul>
            {searchVal
              ? searchVal.map((task) => (
                  <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer flex justify-between items-center text-gray-700">
                    <span>{task.title}</span>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
