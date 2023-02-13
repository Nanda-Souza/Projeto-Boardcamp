import dayjs from 'dayjs'
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
        
        
    
        res.status(200).send(rentals.rows);
      } catch (err) {
        res.status(500).send(err);

      }
    });


    export const createRentals = (async (req, res) => {
        const { customerId,
                gameId,
                daysRented } = req.body
        
        const rentDate = dayjs().format("YYYY-MM-DD")
        
        
        try {

            const customerExist = await db.query(`SELECT name FROM customers WHERE id = $1`, [customerId]);

            if (customerExist.rows.length === 0) {
                return res.status(400).send("Customer not registered!");
              }

            const gameExist = await db.query(`SELECT "pricePerDay", "stockTotal" FROM games WHERE id = $1`, [gameId]);

            if (gameExist.rows.length === 0) {
                return res.status(400).send("Game not registered!");
              }
            
            const originalPrice = daysRented * gameExist.rows[0].pricePerDay
            
            const rentalAvailable = await db.query(
                `select g."stockTotal" from rentals r
                JOIN games g ON r."gameId" = g.id
                where g.id = $1`, [gameId]);
            
            if (rentalAvailable.rowCount > 0){
                if(rentalAvailable.rowCount >= rentalAvailable.rows[0].stockTotal){
                    return res.status(400).send("No games in stock available for rent!");
                }
            }

            await db.query(
                `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") 
                 VALUES ($1, $2, $3, $4, $5)`, [customerId, gameId, rentDate, daysRented, originalPrice]);
           
            
            res.sendStatus(201)            
          } catch (err) {
            res.status(500).send(err);
    
          }
        });
    

        export const finalizeRentals = (async (req, res) => {
            try {
                const { id } = req.params;

                const returnDate = dayjs().format("YYYY-MM-DD")
                

                let delayFee = 0
                
                const rentalExist = await db.query(`SELECT * from rentals WHERE id=$1`, [id])

                const rentDate = rentalExist.rows[0].rentDate

                const daysRented = rentalExist.rows[0].daysRented
                
                const returnRentDate = dayjs(rentDate).add(daysRented, 'day')
                                
                if (rentalExist.rowCount === 0){
                    return res.status(404).send("Rental ID invalid!");                 
        
                }

                if (rentalExist.rows[0].returnDate || rentalExist.rows[0].delayFee){
                    return res.status(400).send("Rental already finalized!"); 
                }
                
                if (dayjs().isAfter(returnRentDate)){
                    
                    
                    const fee = dayjs(returnDate).diff(returnRentDate, "day");
                    
                    const gamePrice = (rentalExist.rows[0].originalPrice/daysRented)
                    
                    delayFee = gamePrice * fee
                } 

                await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,[returnDate, delayFee, id]);                

                res.sendStatus(200)            
              } catch (err) {
                res.status(500).send(err);
        
              }
            });
        
    
    