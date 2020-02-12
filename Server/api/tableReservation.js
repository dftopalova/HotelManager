const express = require("express");
const TableReservation = require('../models/tableReservation');
const User = require('../models/user');

const tableReservationRouter = express.Router();

// creating table reservation for an user
tableReservationRouter.post('/', (req,res, next)=>{
    const { firstName, lastName, email, phone, countPeople } = req.body;

    try {
        let user = User.findOne({ _email: email });
        if (!user) {
            user = await User.create({ firstName: firstName, lastName: lastName, email: email, phone: phone });
            user.save()
        }
        const createdTableReservation = await TableReservation.create({
            firstName: firstName, lastName: lastName, email: email, phone: phone, countPeople: countPeople 
        });
        await User.updateOne({ _id: user.id }, { $push: { tableReservation: createdTableReservation } });

        res.status(200).send('Created Successfully');
    } catch (e) {
        next(e);
    }
})