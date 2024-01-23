const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()

app.use(cors())
app.use('/api', router)
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
