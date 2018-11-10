import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Nav from './navi'
import BasicLayout from '../layout/BasicLayout'

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;


const IndexRouter = (
    <BasicLayout>
      <Switch>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
      </Switch>
    </BasicLayout>
  )

export default IndexRouter;