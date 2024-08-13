import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios here
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box,CardMedia, Link, Card, Grid, Avatar,Button , Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
 


// ----------------------------------------------------------------------



const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------



const BlogPostCard = ({ nomMarq, imgMarq, onDeleteClick, onEditClick }) => {


  return (
    <Card>
    <CardMedia component="img" height="140" image={imgMarq} alt={nomMarq} />
    <CardContent>
      <Typography variant="h6">{nomMarq}</Typography>
      <Button onClick={onEditClick} variant="outlined" color="primary" style={{ marginRight: "1em", borderColor: "#007bff", color: "#007bff" }}>
  Edit
</Button>
<Button onClick={onDeleteClick} variant="outlined" color="secondary" style={{ borderColor: "#dc3545", color: "#dc3545" }}>
  Delete
</Button>

    </CardContent>
  </Card>
);
};

BlogPostCard.propTypes = {
nomMarq: PropTypes.string.isRequired,
imgMarq: PropTypes.string.isRequired,

};
export default BlogPostCard;
