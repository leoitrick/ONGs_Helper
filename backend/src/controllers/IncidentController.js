const connection = require('../database/connection');

module.exports = {

    // LIST ALL THE INCIDENTS WITH PAGINATION (5 ITENS PER PAGE)
    async index(request, response) {
        const { page = 1} = request.query;

        //GET ALL THE INCIDENTS
        const [count] = await connection('incidents').count();

        //SELECT INCIDENTS 5 BY 5 USING BOTH DATABASES INFORMATION
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=','incidents.ongs_id' )
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                     'ongs.name',
                     'ongs.email',
                     'ongs.whatsapp',
                     'ongs.city',
                     'ongs.uf'
                    ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },


    // CREATE AN INCIDENTS
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    // DELETE AN INCIDENT
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};