const app = require('./server')

app.use('/session', require('./src/routes/sessionRoutes'))
app.use('/user', require('./src/routes/userRoutes'))
app.use('/invent', require('./src/routes/inventoryRoutes'))

module.exports = app    