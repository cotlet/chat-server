const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

exports.connect = (io, socket) => {
  redisClient.set(`user_${socket.user.id}`, socket.id);
  io.to(socket.id).emit('connected', {
    status: 'ok',
    message: 'connected'
  });
};

exports.disconnect = async (io, socket) => {
  await redisClient.del(`user_${socket.user.id}`);
  io.to(socket.id).emit('disconnected', {
    status: 'ok',
    message: 'disconnected'
  });
};
