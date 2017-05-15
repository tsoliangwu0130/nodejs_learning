const mongoose = require('mongoose');
const { MongoClient, ObjectID } = require('mongodb'); // destructure an object - ES6

var dbURL = 'mongodb://localhost:27017/TodoApp';

// connect to database
MongoClient.connect(dbURL, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // insert document to collection
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo:', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Leon',
    //     age: 28,
    //     location: 'Corvallis'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert users:', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    // fetch documents from collection
    // db.collection('Todos').find({
    //     _id: new ObjectID('591a0608fe88016df4971871')
    // }).toArray().then((docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch todos:', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${ count } `);
    // }, (err) => {
    //     console.log('Unable to fetch todos:', err);
    // });

    // delete documents from collection
    // db.collection('Todos').deleteMany({ text: 'Excerise' }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({ text: 'Excerise' }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // });

    // update documents from collection
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('591a0608fe88016df4971871')
    }, {
        // MongoDB update operator
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // close database
    // db.close();
});
