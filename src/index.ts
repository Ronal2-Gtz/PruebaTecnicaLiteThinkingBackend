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
const PATHS = {
  COMPANY_PATH: '/api/company',
  USER_PATH: '/api/user',
  AUTH_PATH: '/api/auth',
  INVENTORY_PATH: '/api/inventory'
}

const app = express()

app.use(express.json())
app.use(cors())
app.use(PATHS.AUTH_PATH, authRouter)
app.use(PATHS.COMPANY_PATH, companyRouter)
app.use(PATHS.INVENTORY_PATH, inventoryRouter)
app.use(PATHS.USER_PATH, userRouter)

dbConnection()

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
