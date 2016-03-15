// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/data_pika'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: 'postgres://vdfjrmolgnhliq:389jbcpresCAeGucO1ul5AjDvO@ec2-54-83-56-177.compute-1.amazonaws.com:5432/d92j8ghol9fhcg?ssl=true'
  }
};
