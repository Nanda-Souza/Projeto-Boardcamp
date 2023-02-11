import { db } from "../config/database.js"


export const getRentals = (async (req, res) => {
    try {
        
        const rentals = await db.query(`SELECT
        r.*,
        JSON_BUILD_OBJECT('id', c.id, 'name', c.name) AS customer,
        JSON_BUILD_OBJECT('id', g.id, 'name', g.name) AS game
        FROM rentals r
        JOIN customers c ON r."customerId" = c.id
        JOIN games g ON r."gameId" = g.id;`);
        
        
    
        res.send(rentals.rows);
      } catch (err) {
        res.status(500).send(err);

      }
    });