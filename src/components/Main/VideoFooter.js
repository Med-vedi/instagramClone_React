import React, { useState, useEffect, Link } from "react";
import "./VideoFooter.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../../firebase";
import firebase from "firebase";
import CommentsModal from "./Comments/CommentsModal";

// to FIX posting likes in DB

const VideoFooter = ({ id, description, seller, user, sellerLink }) => {
  const [liked, setLiked] = useState(false);
  const [likesCounter, setLikesCounter] = useState(0);
  // console.log({id});
  useEffect(() => {
    let likesCount;
    likesCount = db
      .collection("videos")
      .doc(id)
      .collection("likes")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.length);
        setLikesCounter(snapshot.size);
      });
    return () => {
      likesCount();
    };
  }, [id]);

  const onLikeClick = () => {
    console.log(likesCounter);
    setLiked(true);
    db.collection("videos").doc(id).collection("likes").add({
      likes: 1,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const onUnLikeClick = () => {
    console.log(likesCounter);
    setLiked(false);
    db.collection("videos").doc(id).collection("likes").doc(id).delete();
  };

  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <a href={sellerLink}>
          {/* {" "} */}
          <h3>{seller}</h3>
          <p>{description}</p>

        </a>

      </div>
      <div className="videoFooter__Buttons__container">
        <div className="videoFooter__btn">
          <CommentsModal key={id} videoId={id} seller={seller} user={user} />
        </div>
        <div className="videoFooter__btn">
          {liked ? (
            <FavoriteIcon fontSize="large" onClick={onUnLikeClick} />
          ) : (
            <FavoriteBorderIcon fontSize="large" onClick={onLikeClick} />
          )}
          <p>{likesCounter}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoFooter;