import React from 'react';
import {
  Grid,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  Box,
  Typography,
} from '@material-ui/core';
import { Button } from 'components';
import { useDispatch } from 'react-redux';
import { setAssessmentType } from 'store/assessmentTypeReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const Dialog = withStyles({
  paper: {
    borderRadius: '35px',
    padding: '15px',
  },
})(MuiDialog);
const FurtherAssessment = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleRedirect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const { value } = event.currentTarget as HTMLButtonElement;
    dispatch(setAssessmentType(value));
    navigate(`/assessment/${id}/${2}/${value}`);
  };
  return (
    <Box m={1}>
      <Button.Primary onClick={handleOpen} variant="outlined">
        Further Assessment
      </Button.Primary>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography component="div" noWrap variant="h6">
            Further Assessment
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="news2"
                  fullWidth
                >
                  NEWS2 Observation
                </Button.Primary>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="denwis"
                  fullWidth
                >
                  DENWIS{' '}
                </Button.Primary>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="sepsis"
                  fullWidth
                >
                  SEPSIS Screen{' '}
                </Button.Primary>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box width="250px">
                <Button.Primary
                  onClick={handleRedirect}
                  variant="outlined"
                  value="covid"
                  fullWidth
                >
                  COVID Assessment{' '}
                </Button.Primary>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default FurtherAssessment;
