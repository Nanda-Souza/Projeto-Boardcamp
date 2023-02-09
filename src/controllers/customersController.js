import { db } from "../config/database.js"


export const getCustomers = (async (req, res) => {

    try {
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);
      } catch (err) {
        res.status(500).send(err.message);
      }
    
    })

    export const getCustomersById = (async (req, res) => {

      try {
          const { id } = req.params;
          const result = await db.query( `SELECT * FROM customers WHERE id = ${id};`);
          
          if (result.rowCount === 0){
            return res.status(404).send("Customer not found!");
            
          }
          res.status(200).send(result.rows[0]);

        } catch (err) {
          res.status(500).send(err.message);
        }
      
      })
    