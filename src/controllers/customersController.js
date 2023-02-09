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

export const createCustomer = (async (req, res) => {
    const { name,
            phone,
            cpf,
            birthday } = req.body
        
       
        try {
    
            const customerExist = await db.query(`SELECT cpf FROM customers WHERE cpf = $1`, [cpf]);
            
            if (customerExist.rowCount > 0){
                return res.status(409).send("Customer already registered!");
                
    
            }
    
            await db.query(
                `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
    
    
        res.sendStatus(201)
    
        } catch (err) {
            res.status(500).send(err);
        }
          
        res.status(201);
        
        
    })
      