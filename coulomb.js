const dc = require('dockerode')
const {app, BrowserWindow} = require('electron')

let win
let docker

function createWindow () {

  docker = new dc({socketPath: '/var/run/docker.sock'})

  // test for docker installation
  docker.version((err) => {
    if (err) {
      win = new BrowserWindow({width: 800, height: 600})
      win.loadURL(`file://${__dirname}/nodocker.html`)
      win.on('closed', () => {
        win = null
      })
    }

  })

}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

exports.setStory = () => {

}

exports.setBuild = () => {

}
