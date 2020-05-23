const connection = require("../database/connection");
const fs = require('fs');

module.exports = {    
    async insertContribution(request, response){
        const user = request.headers.authorization; // Apenas para teste, vai ser alterado depois
        const { name, route, dir, content } = request.body;

        try {
            await fs.promises.writeFile('./src/controllers/comrades/' + user + '/' + dir + '/' + name + '.js', content);

            var list = require('./routes.json');
            list[name] = route;

            var json_content = JSON.stringify(list);

            fs.writeFile('./src/controllers/routes.json', json_content, 'utf8', (err) => {
                if(err) return console.log(err);
            });
            //console.log(createDir(user, dir));
        } catch (err) {
            if(err.code == 'ENOENT'){
                await fs.promises.mkdir('./src/controllers/comrades/' + user + '/' + dir);
                await this.insertContribution(request, response);
            }
        }

        return response.status(204).send();
    }
}