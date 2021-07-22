const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
/* */
const pool = mysql.createPool(database);
pool.getConnection((err, connection)=>
{
    if(err)
    {
        if(err.code === 'PROTOCOL_CONNECTION_LOST')
        {
            console.error('Se perdió la conexión a la base de datos');
        }
        if(err.code === 'ER_CON_COUNT_ERROR')
        {
            console.error('Muchas conexiones');
        }
        if(err.code === 'ECONNREFUSED')
        {
            console.error('Conexión a base de datos rechazada');
        }
    }
    if(connection)  connection.release();
    console.log('Base de datos conectada');
    return;
});

//Conversion callbacks a promesas 
pool.query = promisify(pool.query);
 
module.exports = pool;