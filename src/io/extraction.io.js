
const extractionController = require('./../controller/ExtractionController')


module.exports.repond = (socket,io) => {

    console.log("User Connected of extraction io");

    socket.on("disconnect", () => {
        console.log("User disconnect");
    });

    socket.on("document-update", (msg) => {
        extractionController.save(msg).then((res) => {
            extractionController.edit().then((row) => {io.emit("doc",row)});
        }).catch((err) => {
            console.log(err);
        })
    });

    io.on("documents", () => {
        extractionController.getAll().then((docs) => {
            return docs;
        });
    });
};
