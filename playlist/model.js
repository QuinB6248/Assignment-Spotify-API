const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../User/model')

const Playlist = db.define('playlist', {
  name: {
      type: Sequelize.STRING,
      allowNull:false,
      field: 'playlist_name'
    }
  },
  { 
    tableName: 'playlists',
    timestamps: false 
  }
  )

Playlist.belongsTo(User)

module.exports = Playlist
