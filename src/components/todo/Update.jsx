import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update,id, completed }) => {
  const [Inputs, setInputs] = useState({
    title: update ? update.title : "",
    body: update ? update.body : "",
  });
  const [comp, setComp] = useState(completed);

  const handleCheckboxChange = () => {
    setComp(!comp);
  };
  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        body: update.body,
      });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    console.log(id);
    await axios
      .put(`http://localhost:5000/api/list/updateTask/${id}`, Inputs)
      .then((response) => {
        toast.success(response.data.message);
      });

    display("none");
  };

  return (
    <div className="p-5  d-flex justify-content-center align-items-start flex-column update  ">
      {completed ? (
        <>
          <h3> Your Task is Completed</h3>
          <button
            className="btn btn-danger my-4 mx-3"
            onClick={() => {
              display("none");
            }}
          >
            Close
          </button>
        </>
      ) : (
        <>
          <h3>Update Your Task</h3>
          <input
            type="text"
            className="todo-inputs my-4 w-100 p-3"
            value={Inputs.title}
            name="title"
            onChange={change}
          />
          <textarea
            className="todo-inputs w-100 p-3"
            value={Inputs.body}
            name="body"
            onChange={change}
          />
          <span className=" p-2 todo-inputs">
            <input
              type="checkbox"
              checked={comp}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2">
              {comp ? "Task Completed" : "Task Not Completed"}
            </label>
          </span>
          <div>
            <button className="btn btn-dark my-4" onClick={submit}>
              UPDATE
            </button>
            <button
              className="btn btn-danger my-4 mx-3"
              onClick={() => {
                display("none");
              }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Update;
