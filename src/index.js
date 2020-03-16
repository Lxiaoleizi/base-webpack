import App from './app'

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)
