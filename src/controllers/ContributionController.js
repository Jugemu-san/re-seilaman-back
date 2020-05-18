const connection = require("../database/connection");
const fs = require('fs');

module.exports = {
    async insertContribution(request, response){
        const user = request.headers.authorization; // Apenas para teste, vai ser alterado depois
        const { name, route } = request.body;

        try {
            var list = require('./comrades/' + user + '/list.json');
        } catch (err) {
            if(err.code == 'MODULE_NOT_FOUND'){
                fs.mkdir('./src/controllers/comrades/' + user, (err) => {
                    if(err) return console.log(err);
                    console.log("Vai de novo!");
                });
                var list = {};
            }else{
                console.log(err);
            }
        }
        list[name] = route;

        var json_content = JSON.stringify(list);
        //console.log(list["TestController"]);

        fs.writeFile('./src/controllers/comrades/' + user + '/list.json', json_content, 'utf8', (err) => {
            if(err) return console.log(err);
            console.log('Deu bom');
        });

        return response.status(204).send();
    }
}