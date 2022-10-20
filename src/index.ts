import express from 'express'
import env from 'dotenv'
import companyRouter from './routes/company'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import inventoryRouter from './routes/inventory'
import cors from 'cors'
import { dbConnection } from './database/config';

env.config();

const PORT = process.env.PORT;
const COMPANY_PATH = '/api/company'
const USER_PATH = '/api/user'
const AUTH_PATH = '/api/auth'
const INVENTORY_PATH = '/api/inventory'

const app = express()

app.use(express.json())
app.use(cors())
app.use(AUTH_PATH, authRouter)
app.use(COMPANY_PATH, companyRouter)
app.use(INVENTORY_PATH, inventoryRouter)
app.use(USER_PATH, userRouter)

dbConnection()

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
