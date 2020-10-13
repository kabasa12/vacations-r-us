const con = require('../utils/database');
const jwt = require('jsonwebtoken');

exports.getVacations = async (req, res, next) => {
    let vacations = []; 
    let id = req.query.id
    try {
        vacations = await con.execute(`SELECT v.id,v.name,v.destination,v.description,
                                        v.image,DATE_FORMAT(v.from_date, "%Y-%m-%d") as from_date,
                                        DATE_FORMAT(v.to_date, "%Y-%m-%d") as to_date,v.price,
                                        v.num_of_followers,v.show_vacation,v.last_updated_date,
                                        COALESCE((SELECT 1 FROM users_vacation uv 
                                                    WHERE uv.user_id = ${id} and vacation_id = v.id),0) as follow 
                                        FROM vacations v WHERE v.show_vacation = 1
                                        ORDER BY follow DESC`);
        vacations = vacations[0];
    } catch (err) {
        vacations = err.message;
    }
    res.send(vacations);
}

exports.getAllVacations = async (req, res, next) => {
    
    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            res.sendStatus(403);
        } });
    let vacations = [];

    try {
        vacations = await con.execute(`SELECT v.id,v.name,v.destination,v.description,
                                        v.image,DATE_FORMAT(v.from_date, "%Y-%m-%d") as from_date,
                                        DATE_FORMAT(v.to_date, "%Y-%m-%d") as to_date,v.price,
                                        v.num_of_followers,v.show_vacation,v.last_updated_date 
                                    FROM vacations v ORDER BY id`);
        vacations = vacations[0];

    } catch (err) {
        vacations = err.message;
    }
    res.send(vacations);
}

exports.getVacationById = async (req, res, next) => {
    let id = req.query.id;
    let vacation = [];
    try {
        vacation = await con.execute(`SELECT * FROM vacations WHERE id = "${id}"`);
        vacation = vacation[0]
    } catch (err) {
        vacation = err.message;
    }
    res.send(vacation);
}

exports.getuserVacationById = async (req, res, next) => {
    let id = req.query.id;
    let vacation = [];
    try {
        vacation = await con.execute(`SELECT uv.user_id FROM vacations v 
                                      JOIN users_vacation uv on v.id = uv.vacation_id 
                                      JOIN users u on u.id = uv.user_id WHERE v.id = "${id}"`);
        vacation = vacation[0];
    } catch (err) {
        vacation = err.message;
    }
    res.send(vacation);
}

exports.insertVacation = async (req, res, next) => {

    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            res.sendStatus(403);
        } });

    const fileLocation = req.file ? 'http://localhost:4000/uploads/' + req.file.filename : null;
    const vacation = {
        name: req.body.name,
        destination: req.body.destination,
        description: req.body.description,
        image: fileLocation,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        price: req.body.price,
        num_of_followers: req.body.num_of_followers,
        show_vacation: req.body.show_vacation
    }

    let v = [];
    try {
        v = await con.execute("INSERT INTO vacations (name,destination,description,image,from_date,to_date,price,num_of_followers,show_vacation) VALUES (?,?,?,?,?,?,?,?,?)",
                            [vacation.name,vacation.destination,vacation.description,vacation.image,
                            vacation.from_date,vacation.to_date,vacation.price,vacation.num_of_followers,vacation.show_vacation])
        v = v[0];
    } catch (err) {
        v = err.message;
    }        
    res.send(v);
}

exports.insertUserVacation = async (req, res, next) => {
    let vacation = {
        user_id: req.query.user_id,
        vacation_id: req.query.vacation_id
    }

    let v = [];
    try {
        v = await con.execute("INSERT INTO users_vacation (user_id,vacation_id) VALUES (?,?)",
                              [vacation.user_id,vacation.vacation_id])
        v = v[0];
    } catch (err) {
        v = err.message;
    }

    res.send(v);
}

exports.deleteUserVacation = async (req, res, next) => {
    let vacation = {
        user_id: req.query.user_id,
        vacation_id: req.query.vacation_id
    }

    let v = [];
    try {
        v = await con.execute("DELETE FROM users_vacation WHERE user_id = ? AND vacation_id = ?",
                              [vacation.user_id,vacation.vacation_id])
        v = v[0];
    } catch (err) {
        v = err.message;
    }

    res.send(v);
}

exports.deleteVacation = async (req, res, next) => {
    
    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            res.sendStatus(403);
        } });
    let id = req.params.id;

    let v = [];
    try {
        v = await con.execute(`DELETE FROM vacations WHERE id = ${id}`)
        v = v[0];
    } catch (err) {
        v = err.message;
    }

    res.send(v);
}

exports.updateVacationByid = async (req, res, next) => {
    
    jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
            res.sendStatus(403);
        } });
    let id = req.params.id;
    const fileLocation = req.file ? 'http://localhost:4000/uploads/' + req.file.filename : null;
    let vacation = {
        name: req.body.name,
        destination: req.body.destination,
        description: req.body.description,
        image: fileLocation,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        price: req.body.price,
        num_of_followers: req.body.num_of_followers,
        show_vacation: req.body.show_vacation
    }

    let v = [];
    try {
        v = await con.execute(`UPDATE vacations 
                               SET name=?,destination=?,description=?,
                               image=?,from_date=?,to_date=?,
                               price=?,num_of_followers=?,show_vacation=?
                               WHERE id = ${id}`,
                               [vacation.name,vacation.destination,vacation.description,vacation.image,
                                vacation.from_date,vacation.to_date,vacation.price,
                                vacation.num_of_followers,vacation.show_vacation])
        v = v[0];
    } catch (err) {
        v = err.message;
    }

    res.send(v);
}

exports.updateFolowersVacationByid = async (req, res, next) => {
    let id = req.query.id;
    let num_of_followers = req.query.num_of_followers

    let v = [];
    try {
        v = await con.execute(`UPDATE vacations 
                               SET num_of_followers=?
                               WHERE id = ${id}`,
                               [num_of_followers])
        v = v[0];
    } catch (err) {
        v = err.message;
    }

    res.send(v);
}