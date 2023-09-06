import React, {useState} from "react";
import {Button} from "../../common";

export const SearchBar = ({onSearchPerformed}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChange = (e) =>
    setSearchQuery(e.target.value);

  return (
    <div>
      <input type="text"
             onChange={onChange}
             value={searchQuery}
             placeholder="Enter course name"/>
      <Button buttonText='Search' handleClick={() => onSearchPerformed(searchQuery)}/>
    </div>
  )
};
