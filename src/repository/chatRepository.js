const r = require("rethinkdb");

let chatRepository = {};
r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
    chatRepository.findByIdProjet = (id_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("chat")
                .filter({ id_projet: id_projet })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(chat) {
                            resolve(chat);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    chatRepository.save = (message) => {
        return new Promise((resolve, reject) => {
            r
                .table("chat")
                .insert(message)
                .run(conn, (err, chat) => {
                    if (err) reject(err);
                    resolve(message);
                })
        });
    };
});

module.exports = chatRepository;