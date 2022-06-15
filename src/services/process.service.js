import http from "../http-common";

class ProcessDataService {
  getAll() {
    return http.get("/processes");
  }

  get(id) {
    return http.get(`/processes/${id}`);
  }

  create(data) {
    return http.post("/processes", data);
  }

  update(id, data) {
    return http.put(`/processes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/processes/${id}`);
  }

  deleteAll() {
    return http.delete(`/processes`);
  }

  findByProcessDefinitionName(processDefinitionName) {
    return http.get(`/processes?processDefinitionName=${processDefinitionName}`);
  }
}

export default new ProcessDataService();