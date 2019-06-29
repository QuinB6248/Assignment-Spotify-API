const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = Playlist
