"use client";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InstaCarousel = ({ post }) => {
  console.log("post in carousel: ", post);
  const [children, setChildren] = useState(null);

  useEffect(() => {
    if (post != null) {
      setChildren(post.children);
      console.log("children: ", children);
    }
  }, []);
  return (
    <React.Fragment>
      <Carousel>
        {children.map((photo, i) => (
          <Paper key={i}>
            <Image
              src={photo.media_url}
              width={300}
              height={300}
              alt='instagram photo'
            />
          </Paper>
        ))}
      </Carousel>
      <Typography variant='h3' gutterBottom>
        {post?.caption}
      </Typography>
    </React.Fragment>
  );
};

export default InstaCarousel;
