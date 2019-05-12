const associerRepository = require('./../repository/AssocierRepository');
const User = require('./../entity/user');


let associerController = {}

associerController.invitation = (req, res) => {


    if (req.body.id_project === null || req.session.user === undefined) {
        req.flash("error", "Invitation : tous les parametres sont requis ");
        return;
    }

    const association = {
        id_project: req.body.id_project,
        id_user: new_member,
        statut: 2,
        is_valid: false
    };


    associerRepository.save(association).then((result) => {
        console.log("association saved succesfully ");
    }).catch((err) => {
        console.log("association save error");
        console.log(err);
    });

};

associerController.findAllProjects = (req, res) => {


return new Promise((resolve, reject) => {

     if (req.session.user === undefined) {
        req.flash("error", "liste des projects : tous les parametres sont requis ");
        reject("liste des projects : tous les parametres sont requis ")
    }

    associerRepository.findAllUserProject(req.session.user.id).then((result) => {
        console.log("association find succesfully ");
        
        resolve(result);

    }).catch((err) => {
        res.send(err);
        console.log("association save error");
        console.log(err);
        reject(err);
    });           

});

   

};
module.exports = associerController;