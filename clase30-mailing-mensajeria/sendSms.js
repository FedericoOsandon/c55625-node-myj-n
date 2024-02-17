const twilio = require('twilio')
const { configObject } = require('../config')

const { twilio_auth_token, twilio_account_sid, twilio_number_phone } = configObject


const client = twilio(twilio_account_sid, twilio_auth_token)

exports.sendSms = ( body, user) => client.messages.create({
    body: body + ' ' + user.first_name + ' ' + user.last_name,
    from: twilio_number_phone,
    to: user.phone
})