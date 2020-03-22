import App from './App'
import 'normalize.css/normalize.css'




const render = Component => {
  ReactDOM.render(
    // <Provider store={store}>
      <Component />,
    // {/* </Provider>, */}
    document.getElementById('root'))
}

render(App)