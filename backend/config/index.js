const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development')
    dotenv.config({ path: __dirname.concat('/dev_config.env') })
else if (process.env.NODE_ENV === 'production')
    dotenv.config({ path: __dirname.concat('/product_config.env') })
