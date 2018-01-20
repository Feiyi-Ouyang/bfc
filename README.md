## Set up
### Mongod
Run mongod to handle data requests, access, and management: 

'''
mongod [--dbpath dir/you/save/mongo/instance] [--port 27017]
'''

### Mongo
Run mongo shell to perform data queries and update: 

'''
mongo [--port 27017]
'''

If you check database, you should see:

'''
> show dbs
bfc
> use bfc
> show collections
users
> db.users.find()
{ ... }
'''
