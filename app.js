const cors = require("cors");
const express = require("express");
const bp = require("body-parser");
const passport = require('passport');
const { connect } = require("mongoose");
const { success, error } = require("consola");


// Bring in app constats
const { DB, PORT } = require("./config");

// Initialize appplication
const app = express();

// Middlewares 
// app.use(cors);
app.use(bp.json());
app.use(passport.initialize());

require('./middlewares/passport')(passport);

// User Route Middleware
app.use('/api/users',require("./routes/users"));
app.get('/',(req,res)=>{
    res.send('welocome');
});

const startApp = async () => {
  try {
      // Connet to database
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({
      message: `Successfully connected to database \n${DB}`,
      badge: true,
    });

    // Litesning on port 5000
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({ message: `Falied to connected database ${err}`, badge: true });
    startApp();
  };
  
};

startApp();
