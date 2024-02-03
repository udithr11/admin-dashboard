import React, { useRef, useEffect, useState } from "react";
import { Api_calling } from "../constants";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Admin = () => {
  const [database, setDatabase] = useState([]);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getData();
    focus.current.focus();
  }, []);

  const focus = useRef("");

  const getData = async () => {
    try {
      const data = await fetch(Api_calling);
      const json = await data.json();
      setDatabase(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (id) => {
    setDatabase(database.filter((i) => i.id !== id));
  };

  const handleEdit = (id) => {
    const itemToEdit = database.find((item) => item.id === id);
    setEditData(itemToEdit);
  };
  const handleSave = () => {
    setDatabase((prevDatabase) => {
      return prevDatabase.map((item) =>
        item.id === editData.id ? editData : item
      );
    });
    setEditData({ id: null, name: "", email: "", role: "" });
  };

  const handleInputChange = (key, value) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [key]: value,
    }));
  };

  return (
    <div className="w-[75%] mx-auto bg-red-100 rounded-md">
      <div className="mt-10 mx-1 rounded-sm">
        <input
          className="border ml-1  mt-2"
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={focus}
        />
      </div>
      <div className="bg-blue-200">
        <ul className="flex p-2">
          <li className="w-1/4 font-bold">Name</li>
          <li className="w-1/4 font-bold">Email</li>
          <li className="w-1/4 font-bold">Role</li>
          <li className="w-1/4 font-bold">Actions</li>
        </ul>
      </div>
      <div>
        {database
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.role.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <ul className="flex p-2" key={item.id}>
              <div className="w-1/4">
                {editData.id === item.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                ) : (
                  item.name
                )}
              </div>
              <div className="w-1/4">
                {editData.id === item.id ? (
                  <input
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                ) : (
                  item.email
                )}
              </div>
              <div className="w-1/4">
                {editData.id === item.id ? (
                  <input
                    value={editData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                ) : (
                  item.role
                )}
              </div>
              <li className="w-1/4">
                <span className="flex">
                  {editData.id === item.id ? (
                    <FaEdit
                      title="Save"
                      onClick={() => handleSave(item.id)}
                      className="text-blue-900 mr-2"
                    />
                  ) : (
                    <FaEdit
                      title="Edit"
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-900 mr-2"
                    />
                  )}
                  <MdDelete
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  />
                </span>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Admin;
