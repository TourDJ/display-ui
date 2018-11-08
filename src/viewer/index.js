import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from './navi'

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const Navi22 = () => (

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

  )

class Abc extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

const IndexRouter = (
    <div>
      <Navi22 />
      <Switch>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  )

export default IndexRouter;