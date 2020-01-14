import React from "react";
import { NavLink, Switch } from "react-router-dom";
import BlogIndexContainer from "./blog_index_container";
import BlogYearIndexContainer from "./blog_year_index_container";
import BlogShowContainer from "./blog_show_container";
import { Route } from "react-router-dom";


class BlogBody extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="blog-body-container">
                <nav className="blog-navbar">
                    <NavLink exact activeClassName="active" to="/blog">Latest</NavLink>
                    <NavLink activeClassName="active" to="/blog/2020">2020</NavLink>
                    <NavLink activeClassName="active" to="/blog/2019">2019</NavLink>
                    <NavLink activeClassName="active" to="/blog/2018">2018</NavLink>
                    <NavLink activeClassName="active" to="/blog/2017">2017</NavLink>
                    <NavLink activeClassName="active" to="/blog/2016">2016</NavLink>
                    <NavLink activeClassName="active" to="/blog/2015">2015</NavLink>
                </nav>
                <Switch>
                    <Route path="/blog/:blogYear/:blogId"  component={BlogShowContainer}/>
                    <Route path="/blog/:blogYear" component={BlogYearIndexContainer} />
                    <Route path="/blog/" component={BlogIndexContainer}/>
                </Switch>

            
            </div>
        )
    }
}



export default BlogBody;