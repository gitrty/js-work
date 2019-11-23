
// 飞机大战类
class HitPlane {
  // 0、难度
  constructor(difficulty) {
    switch (difficulty) {
      // 普通难度
      case 1: this.difficulty = 200
        break
      // 困难难度
      case 2: this.difficulty = 400
        break
      // 噩梦难度
      case 3: this.difficulty = 700
        break
    }
  }
  // 1、初始化
  init () {
    // 创建地图
    this.oBox = document.createElement('div')
    this.oBox.style.width = "100%"
    this.oBox.style.height = "100%"
    document.body.appendChild(this.oBox)

    // 创建自己和子弹
    this.createMe()
    // 持续生成敌方飞机
    window.timer1 = setInterval(() => { this.createEnemy() }, 1000)
    // 持续监测敌方飞机与子弹是否碰撞
    window.timer2 = setInterval(this.collide.bind(this), 16)
  }

  ///2、获取可视区域大小
  viewObj () {
    return {
      width: document.documentElement.offsetWidth,
      height: document.documentElement.offsetHeight
    }
  }

  ///3、创建自己
  createMe () {
    // 创建飞机
    let plane = document.createElement('div')
    plane.classList.add('me')
    plane.style.width = 114 + 'px'
    plane.style.height = 93 + 'px'
    plane.style.background = `url(${require('../img/P1.png')}) no-repeat`
    plane.style.position = 'absolute'
    plane.style.bottom = 0
    plane.style.left = '50%'
    plane.style.marginLeft = -114 / 2 + 'px'
    this.oBox.appendChild(plane)

    // 获取飞机的可移动范围
    let oLeft = this.viewObj().width - 114

    // 添加键盘事件(左右移动)
    document.onkeydown = ev => {
      // 获取飞机的位置
      let seat = parseInt(getComputedStyle(plane).left)
      // 左键
      if (ev.keyCode === 37) {
        plane.style.left = seat <= 57 ? 57 + 'px' : seat - 12 + 'px'
      }
      // 右键
      if (ev.keyCode === 39) {
        plane.style.left = seat >= oLeft + 57 ? oLeft + 57 + 'px' : seat + 12 + 'px'
      }
      // 飞机移动时，子弹创建位置跟随飞机移动
      bulletLeft = parseInt(getComputedStyle(plane).left) - 12 / 2
    }

    // 子弹的初始top值
    let bulletTop = parseInt(this.viewObj().height) - 93 - 12
    // 子弹初始的left值
    let bulletLeft = parseInt(getComputedStyle(plane).left) - 12 / 2
    // 创建一颗子弹
    function createBullet () {
      let bullet = document.createElement('p')
      bullet.classList.add('bullet')
      bullet.style.width = '4px'
      bullet.style.height = '12px'
      bullet.style.background = '#ccc'
      bullet.style.borderRadius = '6px'
      bullet.style.position = 'absolute'
      bullet.style.top = bulletTop + 'px'
      bullet.style.left = bulletLeft + 'px'
      this.oBox.appendChild(bullet)
      // 子弹飞行
      let indexTop = bulletTop
      window.timer3 = setInterval(() => {
        // 子弹速度
        indexTop -= 6
        // 子弹飞出顶部时移除
        if (indexTop < 0) {
          bullet.remove()
        }
        bullet.style.top = indexTop + 'px'
      }, 16)
    }
    // 持续生成子弹
    window.timer4 = setInterval(createBullet.bind(this), this.difficulty)
  }

  ///4、创建敌方
  createEnemy () {
    // 生成敌方的位置（随机）
    let oLeft = parseInt((this.viewObj().width - 114) * Math.random())
    // 创建敌方飞机
    let plane = document.createElement('div')
    plane.classList.add('enemy')
    plane.style.width = 114 + 'px'
    plane.style.height = 93 + 'px'
    plane.style.background = `url(${require('../img/P.png')}) -377px 0 no-repeat`
    plane.style.position = 'absolute'
    plane.style.top = 0 - 93 + 'px'
    plane.style.left = oLeft + 'px'
    this.oBox.appendChild(plane)
    // 敌方飞机飞行
    let oTop = parseInt(getComputedStyle(plane).top)
    window.timer5 = setInterval(() => {
      // 敌方飞行速度
      oTop++
      // 敌方飞机飞过底部，清除敌方飞机div，并结束游戏
      if (oTop > this.viewObj().height) {
        plane.remove()
        return
      }
      plane.style.top = oTop + 'px'
    }, 30)
  }

  // 5、判断敌方和子弹的碰撞
  collide () {
    // 所有敌方飞机
    let enemy = document.getElementsByClassName('enemy')
    // 所有子弹
    let bullet = document.getElementsByClassName('bullet')

    // 遍历所有的飞机
    Array.from(enemy).forEach((item1, index1) => {
      // 敌方距离左边的距离
      let enemyLeft = parseInt(getComputedStyle(item1).left)
      // 敌方距离上边的距离
      let enemyTop = parseInt(getComputedStyle(item1).top)

      // 遍历所有的子弹（判断是否与飞机有碰撞）
      Array.from(bullet).forEach((item2, index2) => {
        // 子弹距离左边的距离
        let bulletLeft = parseInt(getComputedStyle(item2).left)
        // 子弹距离上边的距离
        let bulletTop = parseInt(getComputedStyle(item2).top)
        // 判断子弹发射后的轨迹是否会与飞机碰撞
        if (bulletLeft > enemyLeft && bulletLeft < enemyLeft + 114) {
          // 当碰撞后，移除碰撞的飞机和子弹
          if (bulletTop < enemyTop + 93) {
            item1.remove()
            item2.remove()
          }
        }
      })

      // 判断是否有飞机飞过底部（飞过则游戏结束）
      if (enemyTop === this.viewObj().height) {
        this.gameOver()
      }

    })

  }

  // 6、游戏结束
  gameOver () {
    console.info(1)
    clearInterval(window.timer1)
    clearInterval(window.timer2)
    clearInterval(window.timer3)
    clearInterval(window.timer4)
    clearInterval(window.timer5)
    this.oBox.remove()
    btns[1].classList.remove('hid')
  }

}
// 开始和重新开始按钮
let btns = document.querySelectorAll('.score')
// 难度选择按钮组
let diff = document.querySelector('.diff')

// 开始游戏
btns[0].onclick = () => {
  btns[0].classList.add('hid')
  diff.classList.remove('hid')
}
// 重新开始
btns[1].onclick = () => {
  btns[1].classList.add('hid')
  diff.classList.remove('hid')
}

// 难度按钮
// 简单
diff.children[0].onclick = () => selectDiff(1)

// 一般
diff.children[1].onclick = () => selectDiff(2)

// 困难
diff.children[2].onclick = () => selectDiff(3)

function selectDiff (item) {
  diff.classList.add('hid')
  new HitPlane(item).init()
}