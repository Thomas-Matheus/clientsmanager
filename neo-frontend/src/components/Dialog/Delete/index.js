import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useSnackbar } from 'notistack';

import api from '~/services/api';

import { clientInRequest } from '~/store/modules/client/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Delete({ isOpen, handleClose, client }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirmDialogDelete = async () => {
    try {
      await api.delete(`/client/${client.id}`);
      enqueueSnackbar('Removido com sucesso.', { variant: 'success' });
      dispatch(clientInRequest());
    } catch (e) {
      enqueueSnackbar('Não foi possível remover o cadastro selecionado.', {
        variant: 'error',
      });
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">ATENÇÃO</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Você tem certeza que quer deletar esse cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Não
          </Button>
          <Button onClick={() => handleConfirmDialogDelete()} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Delete.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  client: PropTypes.shape().isRequired,
};

Delete.defaultProps = {
  isOpen: false,
};
