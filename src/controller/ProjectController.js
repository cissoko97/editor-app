const projectRepository = require('./../repository/ProjetRepository');
const associerRepository = require('./../repository/AssocierRepository');



let projectController = {};

projectController.createProject = (req, res) => {


    if (req.session.user === undefined) {
        req.flash("error", "chatSendError : tous les parametres sont requis ");
        return;
    }

    const project = {
        desc_project: req.body.desc_project,
        date: new Date()
    };

    projectRepository.save(project).then((result) => {

        console.log(result);
        const associer = {
            id_projet: result.generated_keys[0],
            id_user: req.session.user.id,
            statut: 1,
            is_valid: true
        };
        associerRepository.save(associer).then((association) => {
            console.log('ok succesfully saved association');
            res.redirect('/accueil/project');
        }).catch((err) => {
            res.send(err);
            console.log("An error occur during the create projectting project");
            console.log(err);
        });
        console.log("project saved succesfully ");

    }).catch((err) => {
        res.send(err);
        console.log("An error occur during the create projectting project");
        console.log(err);
    });

};
module.exports = projectController;