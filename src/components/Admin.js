import React, { useRef, useEffect, useState } from "react";
import { Api_calling } from "../constants";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Admin = () => {
  const [database, setDatabase] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    getData();
    focus.current.focus();
  }, []);

  const focus = useRef("");

  const getData = async () => {
    try {
      const data = await fetch(Api_calling);
      const json = await data.json();
      setDatabase(
        json.map((item) => ({
          ...item,
          selected: false,
        }))
      );
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

  const handleCheckboxChange = (id) => {
    setDatabase((prevDatabase) =>
      prevDatabase.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : { ...item, selected: item.selected }
      )
    );
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handle_delete_many = () => {
    setDatabase((prevDatabase) =>
      prevDatabase.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]);
  };

  return (
    <div className="w-[75%] mx-auto bg-red-50 rounded-md">
      <div className="mt-10 flex items-center mx-1 rounded-sm">
        <input
          className="border ml-1 mb-1 mt-2"
          placeholder="Press Enter to Search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={focus}
        />
        <RiDeleteBin7Fill
          title="delete many"
          onClick={handle_delete_many}
          className="text-center ml-auto h-5 w-5 text-red-500"
        />
      </div>

      <div className="bg-slate-600 rounded-md shadow-md">
        <ul className="flex p-2">
          <li className="w-1/4 ml-5 text-white font-bold">Name</li>
          <li className="w-1/4 text-white font-bold">Email</li>
          <li className="w-1/4 text-white font-bold">Role</li>
          <li className="w-1/4 text-white font-bold">Actions</li>
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
            <ul
              className={`flex p-2 ${item.selected ? "bg-indigo-100" : ""}`}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-1"
              />
              <div className="w-1/4">
                {editData.id === item.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSave()
                    }
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSave()
                    }
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSave()
                    }
                  />
                ) : (
                  item.role
                )}
              </div>
              <li className="w-1/4 ">
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
