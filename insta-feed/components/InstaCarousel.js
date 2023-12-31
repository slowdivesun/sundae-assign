"use client";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InstaCarousel = ({ post }) => {
  console.log("post in carousel: ", post);
  console.log("post children in carousel: ", post.children);
  const [children, setChildren] = useState(null);

  useEffect(() => {
    console.log("useeffect in carousel running, post is: ", post);
    if (post != null) {
      setChildren(post.children);
      console.log("children: ", children);
    }
  }, [post]);
  return (
    <React.Fragment>
      <Carousel>
        {children
          ? children.data != null
            ? children.data.map((photo, i) => (
                <Paper key={i}>
                  <Image
                    src={photo.media_url}
                    width={300}
                    height={300}
                    alt='instagram photo'
                  />
                </Paper>
              ))
            : null
          : null}
      </Carousel>
      <Typography variant='h5' gutterBottom>
        Caption: {post?.caption ? post?.caption : "NA"}
      </Typography>
    </React.Fragment>
  );
};

export default InstaCarousel;
