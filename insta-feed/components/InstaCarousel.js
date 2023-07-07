"use client";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import Image from "next/image";
import React from "react";

const InstaCarousel = ({ post }) => {
  return (
    <React.Fragment>
      <Carousel>
        {post.children.map((photo, i) => (
          <Paper>
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
        {post.caption}
      </Typography>
    </React.Fragment>
  );
};

export default InstaCarousel;
