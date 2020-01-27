const db = require("./data/db-config");

module.exports = {
  getResources,
  getProjects,
  getTasks,
  getById,
  addResource,
  addProject,
  addTasks
};

function getResources(project_id) {
  return db("project_resources")
    .join("resources", "resources.id", "project_resources.resource_id")
    .where("project_resources.project_id", project_id);
}

function getProjects() {
  return db("projects");
}

function getTasks(id) {
  return db("tasks")
    .select("projects.id", "tasks.description", "tasks.notes")
    .groupBy("projects.id")
    .join("projects", "projects.id", "tasks.project_id")
    .where("projects.id", id);
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addResource(resource, project_id) {
  return db("resources")
    .insert(resource)
    .then(ids => {
      return db("project_resources")
        .insert({
          resource_id: ids[0],
          project_id
        })
        .then(resp => {
          return getResources(project_id);
        });
    });
}

function addProject(project) {
  return db("projects").insert(project);
}

function addTasks(task, project_id) {
  return db("tasks")
    .insert(task)
    .then(ids => {
      return getTasks(task.project_id);
    });
}
