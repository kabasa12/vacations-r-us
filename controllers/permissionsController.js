const con = require('../utils/database');

exports.getPermission = async (req, res, next) => {
    let permission = [];
    try {
        permission = await con.execute(`SELECT * FROM permissions`);
        permission = permission[0];
    } catch (err) {
        permission = err.message;
    }
    res.send(permission);
}

exports.getRoles = async (req, res, next) => {
    let roles = [];
    try {
        roles = await con.execute(`SELECT * FROM roles`);
        roles = roles[0];
    } catch (err) {
        roles = err.message;
    }
    res.send(roles);
}

exports.getRolePermission = async (req, res, next) => {
    let rolePerm = [];
    try {
        rolePerm = await con.execute(`SELECT p.id as permissions_id,p.name as permission_name,r.name as role_name
                                     FROM permissions p JOIN roles r on p.role_id = r.id`);
        rolePerm = rolePerm[0];
    } catch (err) {
        rolePerm = err.message;
    }
    res.send(rolePerm);
}

exports.getRoleByUserId = async (req, res, next) => {
    let id = req.query.id;
    let rolePerm = [];
    try {
        rolePerm = await con.execute(`SELECT r.name  as role_name,
                                             u.email,u.first_name,u.last_name
                                        FROM roles r JOIN users u ON u.role_id = r.id
                                       WHERE u.id = "${id}"`);
        rolePerm = rolePerm[0];
    } catch (err) {
        rolePerm = err.message;
    }
    res.send(rolePerm);
}