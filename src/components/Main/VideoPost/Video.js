import React, { useRef } from "react";
import "./Video.css";
import cls from "classnames";
import { useState } from "react";
import VideoFooter from "./VideoFooter";
// import { db } from "../../../firebase";
// import { useEffect } from "react";

const Video = ({videoId, url, description, seller, likes}) => {

  // console.log({videoId});
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);


  const handlePostClick = () => {
    setOpen((s) => !s);
  };

  const onVideoPress = () => {
    if (playing) {
      handlePostClick();
      videoRef.current.pause();
      setPlaying(false);
    } else {
      handlePostClick();
      videoRef.current.play();
      setPlaying(true);
    }
  };


  return (
    <div className={cls(`video`, { video__open: isOpen })}>
      <video
        className={cls(`video__player`)}
        // loop
        onClick={onVideoPress}
        ref={videoRef}
        src={url}

      ></video>
      <VideoFooter id={videoId} likes={likes}  seller={seller}
        description={description}/>
      {/* <VideoSidebar/> */}
    </div>
  );
};

export default Video;
