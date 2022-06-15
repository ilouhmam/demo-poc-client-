import React, { Component } from "react";
import ProcessDataService from "../services/process.service";
import { Link } from "react-router-dom";

export default class ProcessesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProcessDefinitionName = this.onChangeSearchProcessDefinitionName.bind(this);
    this.retrieveProcesses = this.retrieveProcesses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProcess = this.setActiveProcess.bind(this);
    this.removeAllProcesses = this.removeAllProcesses.bind(this);
    this.searchProcessDefinitionName = this.searchProcessDefinitionName.bind(this);

    this.state = {
      processes: [],
      currentProcess: null,
      currentIndex: -1,
      searchProcessDefinitionName: ""
    };
  }

  componentDidMount() {
    this.retrieveProcesses();
  }

  onChangeSearchProcessDefinitionName(e) {
    const searchProcessDefinitionName = e.target.value;
    const state = e.target.value;

    this.setState({
      searchProcessDefinitionName: searchProcessDefinitionName,
      
    });
  }

  retrieveProcesses() {
    ProcessDataService.getAll()
      .then(response => {
        this.setState({
          processes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProcesses();
    this.setState({
      currentProcess: null,
      currentIndex: -1
    });
  }

  setActiveProcess(process, index) {
    this.setState({
      currentProcess: process,
      currentIndex: index
    });
  }

  removeAllProcesses() {
    ProcessDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchProcessDefinitionName() {
    this.setState({
      currentProcess: null,
      currentIndex: -1
    });

    ProcessDataService.findByProcessDefinitionName(this.state.searchProcessDefinitionName)
      .then(response => {
        this.setState({
          processes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchProcessDefinitionName, processes, currentProcess, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ProcessDefinitionName"
              value={searchProcessDefinitionName}
              onChange={this.onChangeSearchProcessDefinitionName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchProcessDefinitionName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Processes List</h4>
         
          <ul className="list-group">
            {processes &&
              processes.map((process, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProcess(process, index)}
                  key={index}
                >
                  {process.processDefinitionId}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProcesses}
          >
           
          </button>
        </div>
        <div className="col-md-6">
          {currentProcess ? (
            <div>
              <h4>Process</h4>
              <div>
                <label>
                  <strong> ID:</strong>
                </label>{" "}
                {currentProcess.id}
              </div>
              <div>
                <label>
                  <strong>Definition Name:</strong>
                </label>{" "}
                {currentProcess.processDefinitionName}
              </div>
              <div>
                <label>
                  <strong>Start Time:</strong>
                </label>{" "}
                {currentProcess.startTime}
              </div>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentProcess.state}
              </div>

              <div>
                <label>
                  <strong>Version:</strong>
                </label>{" "}
                {currentProcess.processDefinitionVersion}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Process...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
