import { db } from "../config/database.js"


export const getGames = (async (req, res) => {
    try {
        const gamesList = await db.query("SELECT * FROM games");
        res.status(200).send(gamesList.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
    
})