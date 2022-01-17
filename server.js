#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
require('dotenv').config()
const {
    init,
    run
} = require('./script')

const mongoose = require('mongoose')

const {
    connectionString,
    mongooseOptions
} = require('./config');
const simModel = require('./sim.model')

mongoose.connect(connectionString, mongooseOptions, error => {
    if (error) {
        console.log("Mongo not connected");
    } else {
        console.log("Mongo connected");
    }
});

amqp.connect('amqp://admin:Appsim2020@103.141.144.199:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(async function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'incree-seach';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, async function (msg) {
            console.log(" [x] Received %s");
            let getSims = await simModel.findOne({
                sim: msg.content.toString()
            })
            await run(getSims)
            getSims.count_search += 1
            getSims.success += 1
            await simModel.findOneAndUpdate({
                sim: msg.content.toString()
            }, {
                ...getSims
            }, {
                new: true
            })
            console.log('DONE----')
            channel.ack(msg);
        }, {
            noAck: false
        });

    });
});