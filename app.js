const app = require('./server')

app.use('/', require('./src/routes/sessionRoutes'))
app.use('/', require('./src/routes/userRoutes'))
app.use('/', require('./src/routes/inventoryRoutes'))

module.exports = app    