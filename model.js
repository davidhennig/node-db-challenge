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
    .then(ids => {
      return ids[0]
        .join("resources", "resources.id", "project_resources.resource_id")
        .where("project_resources.project_id", resources);
    });
}

// function addResource(resources, project_id) {
//   return db("project_resources")
//     .join("resources", "resources.id", "project_resources.resource_id")
//     .where("project_resources.project_id", resources, project_id);
// }

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
