import React, { Component } from "react";
import ProcessDataService from "../services/process.service";

export default class Process extends Component {
  constructor(props) {
    super(props);
    this.onChangeProcessDefinitionName = this.onChangeProcessDefinitionName.bind(this);
    this.onChangeStartActivityId = this.onChangeStartActivityId.bind(this);
    this.getProcess = this.getProcess.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
    this.deleteProcess = this.deleteProcess.bind(this);

    this.state = {
      currentProcess: {
        id: null,
        processDefinitionName: "",
        startActivityId: "",
        state:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProcess(this.props.match.params.id);
  }

  onChangeTProcessDefinitionName(e) {
    const processDefinitionName = e.target.value;
    const state = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProcess: {
          ...prevState.currentProcess,
          processDefinitionName: processDefinitionName,
          state:state
        }
      };
    });
  }

  onChangeStartActivityId(e) {
    const startActivityId = e.target.value;
    
    this.setState(prevState => ({
      currentProcess: {
        ...prevState.currentProcess,
        startActivityId: startActivityId,
      }
    }));
  }

  getProcess(id) {
    ProcessDataService.get(id)
      .then(response => {
        this.setState({
          currentProcess: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProcess.id,
      processDefinitionName: this.state.currentProcess.processDefinitionName,
      startActivityId: this.state.currentProcess.startActivityId,
      published: status
    };

    ProcessDataService.update(this.state.currentProcess.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProcess: {
            ...prevState.currentProcess,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProcess() {
    ProcessDataService.update(
      this.state.currentProcess.id,
      this.state.currentProcess
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Process was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProcess() {    
    ProcessDataService.delete(this.state.currentProcess.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/processes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProcess } = this.state;

    return (
      <div>
        {currentProcess ? (
          <div className="edit-form">
            <h4>Process</h4>
            <form>
              <div className="form-group">
                <label htmlFor="processDefinitionName">Test</label>
                <input
                  type="text"
                  className="form-control"
                  id="processDefinitionName"
                  value={currentProcess.processDefinitionName}
                  onChange={this.onChangeprocessDefinitionName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startActivityId">startActivityId</label>
                <input
                  type="text"
                  className="form-control"
                  id="startActivityId"
                  value={currentProcess.startActivityId}
                  onChange={this.onChangeStartActivityId}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">state</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={currentProcess.state}
                  onChange={this.onChangeprocessDefinitionName}
                />
              </div>
            </form>

            {currentProcess.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProcess}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProcess}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Process...</p>
          </div>
        )}
      </div>
    );
  }
}
