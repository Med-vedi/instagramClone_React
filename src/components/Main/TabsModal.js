import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  Tab,
  Tabs,
  AppBar,
  Box,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import "../../App.css";
import Post from "../Main/Post/Post";
import Video from "../Main/VideoPost/Video";
// import InstagramEmbed from "react-instagram-embed";

// -----------------TO DO-----------------
// catch likes => post to tab 'favorites'
// post on start to fix (category?category posts: all posts ordered by date)

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function TabsModal({ user, menuItem }) {
  // console.log(menuItem); //check
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    //controll and sort
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []); //on the start

  useEffect(() => {
    //controll and sort
    db.collection("posts")
      //TO DO true doesn't work
      .where("category", "==", menuItem ? menuItem : true)
      //TO DO
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [menuItem]); //controlling the menu changes

  useEffect(() => {
    db.collection("videos").onSnapshot((snapshot) =>
      setVideos(snapshot.docs.map((doc) => ({ id: doc.id, video: doc.data() })))
    );
  }, [videos]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          //   indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          //   aria-label="full width tabs example"
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Favorite" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div className="tabs__container">
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="tabs__posts_container">
              <div className="tabs__posts">

              </div>
            </div>
          </TabPanel>

          <TabPanel
            className="tabpanel__tab__text"
            value={value}
            index={1}
            dir={theme.direction}
          >
            <div className="tabs__posts_container">
              <div className="tabs__posts"></div>
            </div>
          </TabPanel>
          <TabPanel
            className="tabpanel__tab__text"
            value={value}
            index={2}
            dir={theme.direction}
          >
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                className="tabs__post"
              />
            ))}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}

export default TabsModal;
