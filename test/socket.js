const {
  expect
} = require('chai');
const io = require('socket.io-client');

const User = require('../models/User');

const socketURL = `http://${process.env.NODEJS_IP}:${process.env.NODEJS_PORT}`;

describe('Unauthorized connection token not provided', () => {
  it('Should emit error type unauthorized', (done) => {
    const client = io(socketURL);

    client.on('error', (err) => {
      expect(err.type).to.equal('unauthorized');
      client.disconnect();
      done();
    });
  });
});

describe('Unauthorized connection invalid token', () => {
  it('Should emit error type unauthorized', (done) => {
    const client = io(`${socketURL}?token=invalid_token`);

    client.on('error', (err) => {
      expect(err.type).to.equal('unauthorized');
      client.disconnect();
      done();
    });
  });
});

describe('Successful connection', () => {
  it('Should emit connected', (done) => {
    User.findOne().select('+token').exec((err, user) => {
      if (!err) {
        const client = io(`${socketURL}?token=${user.token}`);

        client.on('connected', (data) => {
          expect(data.message).to.equal('connected');
          client.disconnect();
          done();
        });
      }
    });
  });
});
