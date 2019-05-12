const r = require("rethinkdb");
const ProjetRepository = require('./ProjetRepository');

let associerRepository = {};
r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
    associerRepository.findAllUserProjet = (id_user) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("associer")
                .filter({ id_user: id_user })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(associer) {
                            console.log(123);
                            let userProjet = [];
                            let res = false;
                            let i = 0;
                            do {
                                if (associer.length !== 0) {
                                    let boucler = false;
                                    do {
                                        ProjetRepository.findByIdProjet(associer[i].id_projet).then((projet) => {
                                            console.log("inside");
                                            userProjet.push(projet);
                                            i++;
                                        });
                                        boucler = true;
                                    } while (boucler);
                                }
                                if (i === associer.length) {
                                    resolve(userProjet)
                                }
                            } while (i < associer.length)


                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    associerRepository.findById = (id_projet, id_user) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("associer")
                .filter({ id_projet: id_projet, id_user: id_user })
                // .run(conn, (err, users) => {
                //  if (err) reject(err);
                //  console.log(users[0]);
                //  resolve(users[0]);
                // });
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(associer) {
                            resolve(associer[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    associerRepository.save = (associer) => {
        return new Promise((resolve, reject) => {
            r
                .table("associer")
                .insert(associer)
                .run(conn, (err, associer) => {
                    if (err) reject(err);
                    resolve(associer);
                })
        });
    };
});

module.exports = associerRepository;