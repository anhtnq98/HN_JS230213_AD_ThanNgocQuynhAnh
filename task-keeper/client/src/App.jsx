import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputOrNot, setInputOrNot] = useState(null);
  const [value, setValue] = useState({
    Content: "",
    DueDate: "",
    Status: "",
    AssignedTo: "",
  });
  const renderTasks = () => {
    axios
      .get("http://localhost:5000/api/v1/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => err);
  };
  renderTasks();

  const handleChange = (e) => {
    const newValue = { ...value, [e.target.name]: e.target.value };
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    if (
      !value.Content ||
      !value.DueDate ||
      !value.Status ||
      !value.AssignedTo
    ) {
      alert("Thông tin không được để trống");
      return;
    }

    axios.post("http://localhost:5000/api/v1/tasks", value);
    setValue({
      Content: "",
      DueDate: "",
      Status: "",
      AssignedTo: "",
    });
    renderTasks();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/v1/tasks/${id}`);
  };

  const handleUpdate = (id) => {
    setInputOrNot(id);
  };

  const handleChangeEdit = () => {};

  const handleCancel = () => {
    setInputOrNot(null);
  };

  const handleConfirm = (id) => {};

  useEffect(() => {
    renderTasks();
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <div className="input-container">
        <div className="input-block">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              name="Content"
              type="text"
              className="form-control"
              placeholder="Learn Python"
              aria-label="Content"
              aria-describedby="basic-addon1"
              onChange={handleChange}
              value={value.Content}
            />
          </div>
        </div>
        <div className="input-block">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              name="DueDate"
              type="date"
              className="form-control"
              aria-label="Date"
              aria-describedby="basic-addon1"
              onChange={handleChange}
              value={value.DueDate}
            />
          </div>
        </div>
        <div className="input-block">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
            name="Status"
            value={value.Status}
          >
            <option selected="">Choose......</option>
            <option value={1}>Pending</option>
            <option value={2}>Fullfill</option>
            <option value={3}>Reject</option>
          </select>
        </div>
        <div className="input-block">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              name="AssignedTo"
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
              value={value.AssignedTo}
            />
          </div>
        </div>
        <div className="input-block">
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="indexhihi">
                #
              </th>
              <th scope="col" className="content">
                Content
              </th>
              <th scope="col" className="date">
                Due date
              </th>
              <th scope="col" className="status">
                Status
              </th>
              <th scope="col" className="assinged">
                Assigned to
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data?.map((task, taskIndex) => (
              <>
                {inputOrNot !== task.Task_id ? (
                  <>
                    <tr key={taskIndex}>
                      <th scope="row">{taskIndex + 1}</th>
                      <td>{task.Content}</td>
                      <td>{task.DueDate}</td>
                      <td>
                        {task.Status === 1
                          ? "Pending"
                          : task.Status === 2
                          ? "Fullfill"
                          : "Reject"}
                      </td>
                      <td>{task.AssignedTo}</td>
                      <td>
                        <button
                          onClick={(e) => handleUpdate(task.Task_id)}
                          style={{ marginRight: "3px" }}
                          type="button"
                          className="btn btn-success"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => handleDelete(task.Task_id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr key={taskIndex}>
                      <th scope="row">{taskIndex + 1}</th>
                      <td>
                        <input
                          name="Content"
                          type="text"
                          className="form-control"
                          placeholder="Learn Python"
                          aria-label="Content"
                          aria-describedby="basic-addon1"
                          onChange={handleChangeEdit}
                          value={value.Content}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          onChange={handleChangeEdit}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          onChange={handleChangeEdit}
                          name="Status"
                        >
                          <option selected="">Choose</option>
                          <option value={1}>Pending</option>
                          <option value={2}>Fullfill</option>
                          <option value={3}>Reject</option>
                        </select>
                      </td>
                      <td>
                        <input
                          name="AssignedTo"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleChangeEdit}
                          value={value.AssignedTo}
                        />
                      </td>
                      <td>
                        <button
                          onClick={(e) => handleConfirm(task.Task_id)}
                          style={{ marginRight: "3px" }}
                          type="button"
                          className="btn btn-info"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={handleCancel}
                          type="button"
                          className="btn btn-danger"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
