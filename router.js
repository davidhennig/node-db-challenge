const express = require("express");
const projects = require("./model");
const router = express.Router();

router.get("/:id/resources", (req, res) => {
  projects
    .getResources(req.params.id)
    .then(resp => {
      res.json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error getting resources" });
    });
});

router.get("/", (req, res) => {
  projects
    .getProjects()
    .then(resp => {
      res.json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error getting projects" });
    });
});

router.get("/:id/tasks");

router.get("/:id", (req, res) => {
  projects
    .getById(req.params)
    .then(resp => {
      if (resp) {
        res.json(resp);
      }
      res.status(400).json({ message: "could not find given id" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error getting resources" });
    });
});

router.post("/:id", (req, res) => {
  projects
    .getById(req.params.id)
    .then(resp => {
      if (resp) {
        projects.addResource(req.body, req.params.id).then(response => {
          res.status(201).json(response);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

router.post("/", (req, res) => {
  projects
    .addProject(req.body)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error adding project" });
    });
});

router.post("/:id/tasks");

module.exports = router;
