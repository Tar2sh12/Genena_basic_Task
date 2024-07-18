import express from 'express';
import { config } from "dotenv";


import { db_connection } from "./DB/connection.js";
import customerRouter from './src/modules/Customer/customer.routes.js';
import groupRouter from './src/modules/Group/group.routes.js'
import vendorRouter from './src/modules/Vendor/vendor.routes.js'
import { globaleResponse } from './src/middleware/error-handling.middleware.js';



const app = express();

config();

const port = process.env.PORT;


app.use(express.json());



app.use("/customer", customerRouter);
app.use("/vendor", vendorRouter);
app.use("/group", groupRouter);



app.use(globaleResponse);



db_connection();


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
