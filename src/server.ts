import express from 'express'
import * as dotenv from 'dotenv'
import router from './routes'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(Number(process.env.PORT) || 3333, '0.0.0.0', () =>
  console.log(`Server listening on port ${process.env.PORT}`),
)
