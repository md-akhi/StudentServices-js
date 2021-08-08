const MProject = require("../models/poroject");
const MEmployer = require("../models/employer");
const { template, path } = require("../config/static");

module.exports = function (infoApp) {
  // middleware function
  const Mid = require("../controllers/middleware")(infoApp);
  // middleware function to check for logged-in users
  return {
    getRoot: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CEmployer(), {
          name: "employer",
        });
      },
    ],

    getProject: [
      Mid.logInChecker,
      function (req, res) {
        let userId = infoApp.session.user.id;
        MProject.find(
          {
            userId: userId,
          },
          function (err, Project) {
            res.render(template.CEmployer() + "/project_list", {
              list: Project,
            });
          }
        );
      },
    ],

    getAddProject: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CEmployer() + "/project_add", {
          name: "employer",
        });
      },
    ],
    postAddProject: [
      Mid.logInChecker,
      function (req, res) {
        const {
          name,
          description,
          status,
          company,
          estimated,
          total,
          duration,
        } = req.body;

        let newPoroject = new MProject({
          userId: infoApp.session.user.id,
          name: name,
          description: description,
          status: status,
          estimatedBudget: estimated,
          estimatedDuration: duration,
          // payId: payId,
          // request: request,
          // Progress: Progress,
          // date: date,
        });

        newPoroject
          .save(newPoroject)
          .then((poroject) => {
            // REDIRECT TO THE project
            res.redirect(path.CEmployer() + "/project");
          })
          .catch((err) => {
            res.render(path.CEmployer() + "/project_add", {
              message: "failed set to db",
            });
          });
      },
    ],

    getEditProject: [
      Mid.logInChecker,
      function (req, res) {
        let userId = infoApp.session.user.id;
        let id = req.params.id;
        MProject.find({ _id: id, userId: userId }, function (err, project) {
          if (!project[0]) res.redirect(path.CEmployer() + "/project");
          res.render(template.CEmployer() + "/project_add", {
            data: project[0],
            isEdit: true,
          });
        });
      },
    ],
    postEditProject: [
      Mid.logInChecker,
      function (req, res) {
        const {
          name,
          description,
          status,
          company,
          estimated,
          total,
          duration,
        } = req.body;

        let id = req.params.id;
        MProject.findById(id, function (err, edit) {
          edit.name = name;
          edit.description = description;
          edit.estimatedBudget = estimated;
          edit.estimatedDuration = duration;
          // payId: payId,
          // request: request,
          // Progress: Progress,
          // date: date,
          edit.save();
        });
        // REDIRECT TO THE project
        res.redirect(path.CEmployer() + "/project");
      },
    ],

    getDetailProject: [
      Mid.logInChecker,
      function (req, res) {
        let userId = infoApp.session.user.id;
        let id = req.params.id;
        MProject.find({ _id: id, userId: userId }, function (err, project) {
          if (!project[0]) res.redirect(path.CEmployer() + "/project");
          res.render(template.CEmployer() + "/project_detail", {
            data: project[0],
          });
        });
      },
    ],
    postDetailProject: [Mid.logInChecker, function (req, res) {}],

    getDeleteProject: [
      Mid.logInChecker,
      function (req, res) {
        let id = req.params.id;
        MProject.findByIdAndDelete(id, function (err) {
          if (err) console.log(err);
          console.log("Successful deletion");
        });
        // REDIRECT TO THE project
        res.redirect(path.CEmployer() + "/project");
      },
    ],

    getInvoiceProject: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CEmployer() + "/invoice", {
          name: "employer",
        });
      },
    ],
    postInvoiceProject: [Mid.logInChecker, function (req, res) {}],

    getInvoicePrintProject: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CEmployer() + "/invoice_print", {
          name: "employer",
        });
      },
    ],
  };
};
