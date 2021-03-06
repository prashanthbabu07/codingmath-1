msg.innerHTML = 'Use Arrow Keyboard: Up, Down, Left, Right'

const fl = 300,
points = [],
project = () => {
  for (let i = 0; i < points.length; i++) {
    const p = points[i],
    scale = fl / (fl + p.z)

    p.sx = p.x * scale
    p.sy = p.y * scale
  }
},
drawLine = (...args) => {
  let p = points[args[0]]

  c.moveTo(p.sx, p.sy)

  for (let i = 1; i < args.length; i++) {
    p = points[args[i]]
    c.lineTo(p.sx, p.sy)
  }
},
translateModel = (x, y, z) => {
  for (let i = 0; i < points.length; i++) {
    points[i].x += x
    points[i].y += y
    points[i].z += z
  }
},
update = () => {
  c.clearRect(-width / 2, -height / 2, width, height)

  project()

  c.beginPath()
  drawLine(0, 1, 2, 3, 0)
  drawLine(4, 5, 6, 7, 4)
  drawLine(0, 4)
  drawLine(1, 5)
  drawLine(2, 6)
  drawLine(3, 7)
  c.stroke()
},
keyEvent = e => {
  switch(e.keyCode) {
    case 37: // left
    translateModel(-20, 0, 0)
    break
    case 39: // right
    translateModel(20, 0, 0)
    break
    case 38: // up
    e.shiftKey ? translateModel(0, 0, 20) : translateModel(0, -20, 0)
    break
    case 40: // down
    e.shiftKey ? translateModel(0, 0, -20) : translateModel(0, 20, 0)
    break
  }
  update()
}

c.translate(width / 2, height / 2)

points[0] = { x: -500, y: -500, z: 1000 }
points[1] = { x:  500, y: -500, z: 1000 }
points[2] = { x:  500, y: -500, z: 500 }
points[3] = { x: -500, y: -500, z: 500 }
points[4] = { x: -500, y: 500, z: 1000 }
points[5] = { x:  500, y: 500, z: 1000 }
points[6] = { x:  500, y: 500, z: 500 }
points[7] = { x: -500, y: 500, z: 500 }

update()

document.body.addEventListener('keydown', keyEvent)
