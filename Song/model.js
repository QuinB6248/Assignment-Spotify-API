const Sequelize = require('sequelize')
const db = require('../db')
const Playlist= require('../Playlist/model')

const Song = db.define('song', {
  title: {
      type: Sequelize.STRING,
      field: 'song_title'
    },
  artist: {
      type: Sequelize.STRING,
      field: 'song_artist'
    },
  album: {
      type: Sequelize.STRING,
      field: 'song_album'
    }, 
  },
  
  { 
    tableName: 'songs',
    timestamps: false 
  }
)

Song.belongsTo(Playlist)

module.exports = Song