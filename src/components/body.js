import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Button  , Dialog , DialogContent , DialogActions } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

}));



export default function RenderImageList(props) {
  const classes = useStyles();
  const [modalImageURL , setModalImageUrl] = React.useState('');
  const [open , setOpen] = React.useState(false);

  const openDialog = (item) => {
    setModalImageUrl(`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`);
    setOpen(true);

  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ImageList  cols={3}>
        {props.imageData && props.imageData.map((item) => (
          <ImageListItem key={item.id} cols={ 1} >
            <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg` } alt={item.title} onClick = {()=>openDialog(item)} />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={modalImageURL} alt={''}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
