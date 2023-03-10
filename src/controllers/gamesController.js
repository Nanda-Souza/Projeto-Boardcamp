import { db } from "../config/database.js"


export const getGames = (async (req, res) => {
    try {
        const gamesList = await db.query("SELECT * FROM games");
        res.status(200).send(gamesList.rows);
      } catch (err) {
        res.status(500).send(err);
      }
    
})

export const createGames = (async (req, res) => {
    const { name,
            image,
            stockTotal,
            pricePerDay } = req.body
    
   
    try {

        const gameExist = await db.query(`SELECT name FROM games WHERE name = $1`, [name]);
        
        if (gameExist.rowCount > 0){
            return res.status(409).send("Game already registered!");
            

        }

        await db.query(
            `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);


    res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err);
    }
      
    res.status(201);
    
    
})