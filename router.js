const express = require("express");
const projects = require("./model");
const router = express.Router();

router.get("/:id/resources", (req, res) => {
  projects
    .getResources()
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

router.post("/:id/resources", (req, res) => {
  projects
    .addResource(req.body)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error adding resources" });
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
      res.status(500).json({ message: "error getting resources" });
    });
});

router.post("/:id/tasks");

module.exports = router;
