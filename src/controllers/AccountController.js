const connection = require("../database/connection");

module.exports = {
    async create(request, response){
        const { username, password } = request.body;

        const [user] = await connection('users').insert({
            username,
            password
        });

        return response.json({ user });
    },

    async index(request, response){
        const users = await connection('users').select('*');

        return response.json(users.username);
    }
}