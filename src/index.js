//index.js
import './index.less'
class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
if (DEV === 'dev') {
  console.log('dev')
}
// alert('webpack')
const dog = new Animal('dog')
//需要将 localhost:3000 转发到 localhost:4000（服务端） 端口
fetch('/user')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
//src/index.js
fetch('/login/account', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: '888888'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
