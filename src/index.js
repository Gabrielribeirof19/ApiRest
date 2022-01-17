const { request, response } = require('express');
const express = require('express');
const {uuid} =  require('uuidv4');
const app = express();

app.use(express.json());

/**
 * MÉTODOS HTTP:
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * QUERY PARAMS: Filtros e paginação
 * ROUTE PARAMS: Identicar recursos (atualizar/deletar)
 * REQUEST BODY: Conteudo na hora criar ou editar um recurso (JSON)
 * 
 */

/**
 * Express: micro framework, auxilia para poder acessar diversas urls diferentes
 */

/**
 * Middleware:
 * 
 * interceptador de requisições:
 *  pode interrepor totalmente a requisição
 *  alterar dados da requisição
 * 
 */



const projects = [];




app.get('/projects', 
(request, response) => {
    const {title} = request.query;
    const filter = title 
    ? projects.filter(project => project.title.includes(title)) 
    : projects;
    return response.json(filter);
});


app.post('/projects', 
(request, response) => {
    const {title, owner} = request.body;
    
    const project = {id: uuid(), title, owner};
    projects.push(project);
    
    
    return response.json(project)});

app.put('/projects/:id', 
(request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }
    const project = {
        id,
        title,
        owner,
    };
    projects[projectIndex] = project
    
    return response.json(project);
    });

app.delete('/projects/:id', 
(request, response) => {
    const {id} =  request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});
    }
    projects.splice(projectIndex, 1);
    
    
    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('back-end started 😎');
});
