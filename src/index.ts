import express from 'express'
import env from 'dotenv'
import companyRouter from './routes/company'
import cors from 'cors'

env.config();

const PORT = process.env.PORT;
const COMPANY_PATH = '/api/company'

const app = express()

app.use(express.json())
app.use(cors())
app.use(COMPANY_PATH, companyRouter)

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
