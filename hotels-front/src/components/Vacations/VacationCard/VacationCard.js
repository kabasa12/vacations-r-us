import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Card,CardHeader,CardMedia,CardContent,CardActions,
        Collapse,Avatar,IconButton,Typography,Box,Tooltip} from '@material-ui/core';
import Logo from '../../Logo/Logo';
import './VacationCard.css'


//MuiTypography-root  MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor:'rgb(54, 52, 53)',
    color:'gold'
  },
  MuiBox:{
    '@media (max-width: 500px)':{marginLeft:"10px"}
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const VacationCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let Varr = {...props.vacations};
  let fromDate = new Date(Date.parse(Varr.from_date))
  let fromDateNum = fromDate;
  fromDate = fromDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  let toDate = new Date(Date.parse(Varr.to_date))
  let toDateNum = toDate
  toDate = toDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  let btnColor = Varr.follow ? "Fav-container" : null;
  let totalStay = Math.floor((toDateNum-fromDateNum)/(1000*60*60*24))-1

  return (
    <Box className={classes.MuiBox} ml={4} display="flex" alignSelf='flex-start'>
    <Card className={classes.root} style={{margin:'2rem'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Logo />
          </Avatar>
        }
        action={
          <Box textAlign='center'
               justifyContent='center'
               margin="1rem"
               component="div">
             {Varr.num_of_followers}
          </Box>
        }
        title={Varr.name}
        subheader={<Box component="div" color="white"> {Varr.destination} </Box>}
      />
      <CardMedia
        component="img"
        alt={props.vacations.name + ' picture'}
        height="140"
        image={props.vacations.image}
        title={props.vacations.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="div">
          <Box component="div" color="gold"> Price: {Varr.price}$ </Box>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          <Box component="div" color="white"> {fromDate} - {toDate} </Box>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          <Box component="div" color="gray"> 1 room for {totalStay} nights </Box>
        </Typography>
      </CardContent>
      <CardActions> {/*disableSpacing*/}
        <Tooltip title="Add to favorite">
          <IconButton aria-label="add to favorites"
                      onClick={(e) => {
                        e.preventDefault()
                        return props.updateFollowers(Varr.id,Varr.num_of_followers)
                        }}>
            <div className={btnColor}>
            <FavoriteIcon/>
            </div>
          </IconButton>
        </Tooltip>
        <Tooltip title="Book Vacation">
          <IconButton aria-label="add to shopping cart" color="primary"
                      onClick={(e) => {
                        e.preventDefault()
                        return props.goToTotal(Varr.id)
                        
                        }}>
              <AddShoppingCartIcon style={{marginLeft:'-1rem'}}/>
          </IconButton>
        </Tooltip>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
              <Box component="div" color="gold"> Read More... </Box>
            </Typography>
          </CardContent>
        <IconButton style={{color:'white'}}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {Varr.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card></Box>
  );
}

export default VacationCard;