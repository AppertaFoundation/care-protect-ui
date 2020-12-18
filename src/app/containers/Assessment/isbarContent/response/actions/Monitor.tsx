/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Grid,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogContentText,
  Box,
  DialogActions,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, RadioGroup } from 'components';
import { useDispatch } from 'react-redux';
import { actions } from '../../../slice';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const breakpoints = createBreakpoints({});

const Dialog = withStyles({
  paper: {
    [breakpoints.up('sm')]: {
      borderRadius: '35px',
      padding: '15px',
    },
  },
})(MuiDialog);
const Monitor = () => {
  const [open, setOpen] = React.useState(false);
  const [other, setOther] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const methods = useForm({});
  const dispatch = useDispatch();
  const { watch, register, handleSubmit } = methods;

  const useEffectOnOther = (effect: React.EffectCallback) => {
    useEffect(effect, [watch('monitorTime')]);
  };
  useEffectOnOther(() => {
    const monitorTime = watch('monitorTime');
    setOther(monitorTime === 'other');
  });
  const onSubmit = data => {
    dispatch(actions.actionMonitor(data));
    handleClose();
  };
  return (
    <Box m={1}>
      <Button.Primary onClick={handleOpen} variant="outlined">
        Monitor
      </Button.Primary>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={'sm'}
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography component="div" noWrap variant="h6">
            Request Observation Monitor Task{' '}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Patient News2 score was 3, we recommend you monitor the patient
            every 15 minutes
          </DialogContentText>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="monitor-frequency">
              <Grid
                container
                direction="column"
                justify="space-around"
                spacing={2}
              >
                <Grid item xs={12}>
                  <RadioGroup
                    name="monitorTime"
                    label="Select Frequency:"
                    register={register}
                    values={[
                      {
                        id: '15',
                        value: 'Every 15 Minutes',
                      },
                      {
                        id: '30',
                        value: 'Every 30 Minutes',
                      },
                      {
                        id: '60',
                        value: 'Every 60 Minutes',
                      },
                      {
                        id: 'other',
                        value: 'Other',
                      },
                    ]}
                  />
                </Grid>
                {other && (
                  <Grid item>
                    <TextField
                      inputRef={register({
                        required: 'This field is required',
                      })}
                      InputLabelProps={{ shrink: true }}
                      name="other"
                      label="Other"
                      placeholder="Other"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">min</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </form>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button.Primary onClick={handleClose} color="primary">
            Cancel
          </Button.Primary>
          <Button.Secondary
            color="primary"
            variant="contained"
            form={`monitor-frequency`}
            type="submit"
          >
            Confirm
          </Button.Secondary>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Monitor;
