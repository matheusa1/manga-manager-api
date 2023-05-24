import express from 'express'
import * as dotenv from 'dotenv'
import router from './routes'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(3333, () =>
  console.log(`Server listening on port ${process.env.PORT}`),
)
