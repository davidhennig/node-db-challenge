const db = require("./data/migrations/db-config");

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
  return db("resources")
    .join("resources", "resources.id", "project_resources.resources_id")
    .where("project_resources.project_id", project_id);
}

function getProjects() {
  return db("projects");
}

function getTasks(id) {
  return db("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .where("projects.id", id);
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .where(ids => {
      return getById(ids[0]);
    });
}

function addProject(project) {
  return db("projects").insert(project);
}

function addTasks(task) {
  return db("tasks")
    .insert(task)
    .where(ids => {
      return getById(ids[0]);
    });
}
