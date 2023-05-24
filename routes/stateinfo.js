const errors = require('restify-errors');
const states = require('./states');

module.exports = server =>{

    //Get info of a state by name
    // server.get('/state/:statename', (req, res, next) => {
    //     // res.send(states[0], states);
    //     for(let i = 0; i < states.length;i++){
    //         if(states[i].state == req.params.statename){
    //             res.send(states[i]);
    //             console.log(states[i]);
    //         }
    //         res.end();
    //     }
       
    //     next();
    // }) 
    

    //Retrive data and append to array
    server.post('/state', (req, res, next) =>{
        // res.send(req.body.state);   // for content
        const newinfo = {
            state : req.body.state,
            capital: req.body.capital,
            regionalLanguages: req.body.regionalLanguages,
            noOfDistricts: req.body.noOfDistricts
        }
        states.push(newinfo);
        res.json(states)
        // res.send(req.body)  // entire json object
        // console.log(req.body);
        res.end();
        next();
    })

    //changing the data from array
    server.put('/state/:name', (req, res, next) => {

        let state = req.params.name;
        let capital= req.body.capital;
        let regionalLanguages= req.body.regionalLanguages;
        let noOfDistricts= req.body.noOfDistricts;
        
        let index = 0;
        for(let i = 0; i<states.length;i++){
            if(states[i].state == state){
                index = i;
                // console.log(index);
            }
        }
        if(index >= 0){
            const state_info = states[index];
            state_info.capital = capital;
            state_info.regionalLanguages = regionalLanguages;
            state_info.noOfDistricts = noOfDistricts;
            res.json(state_info);
        }
        else{
            res.status(404);
        }
        res.end();
    })

    //deleting the data from array
    server.del('/state/:name', (req, res, next) => {

        let state = req.params.name;
        let index = 0;
        for(let i = 0; i<states.length;i++){
            if(states[i].state == state){
                index = i;
            }
        }
        if(index >= 0){
            const state_info = states[index];
            states.splice(index, 1);
            res.json(state_info);
            console.log(states);
        }
        else{
            res.status(404);
        }
        res.end();
    })

    //Getting parameters from url
    server.get('/state/:name', (req, res, next) =>{
        // if(has(req.query.id)){
        //     console.log("id is present");
        // }
        let id;
        let token;

        const name = req.params.name;
        if(!req.query.id || !req.query.token){
            res.status(200)
            res.send("required parameters are not provided");
            res.send(
                {'name':name}
            );
            res.end();
        }
        //if(req.query.id && req.query.token){
            if(req.query.id){
                id = req.query.id;
            }
            if(req.query.token){
                token = req.query.token;
            }
            res.status(200)
            res.send({
                'id': id,
                'token': token,
                'name': name 
            });
            res.end();
        //}
        
    })
}