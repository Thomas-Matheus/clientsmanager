import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as Yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import TextField from '~/components/TextField';
import CheckBox from '~/components/Checkbox';

import getValidationErrors from '~/utils/getValidationErrors';

import api from '~/services/api';
import { clientInRequest } from '~/store/modules/client/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #444',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '450px',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
}));

export default function UpdateClient({ isOpen, handleClose, client }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        cpfCnpj: Yup.string()
          .min(11, 'O campo deve conter 11 digitos para CPF ou 14 para CNPJ')
          .max(14, 'O campo deve conter 11 digitos para CPF ou 14 para CNPJ')
          .test('cpf', 'CPF inválido', (value) => {
            if (value.replace(/\D+/g, '').length === 11) {
              return cpf.isValid(value);
            }

            return true;
          })
          .test('cnpj', 'CNPJ inválido', (value) => {
            if (value.replace(/\D+/g, '').length === 14) {
              return cnpj.isValid(value);
            }

            return true;
          })
          .required('CPF/CNPJ obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.blackList = data.blackList === 'true';

      await api.put(`/client/${client.id}`, data);
      enqueueSnackbar('Atualizado com sucesso.', { variant: 'success' });
      dispatch(clientInRequest());
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current.setErrors(errors);

      enqueueSnackbar('Preencha corretamente os campos.', {
        variant: 'error',
      });
    }
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={client}
            className={classes.paper}
          >
            <Typography
              className={classes.modalTitle}
              id="transition-modal-title"
            >
              Atualizar Cliente
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              color="primary"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpfCnpj"
              label="CPF / CNPJ"
              name="cpfCnpj"
              autoComplete="cpfCnpj"
              color="primary"
              inputProps={{ maxLength: 14 }}
            />
            <CheckBox
              variant="outlined"
              margin="normal"
              required
              label="BlackList?"
              name="blackList"
              color="primary"
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Atualizar
              </Button>
            </div>
          </Form>
        </div>
      </Fade>
    </Modal>
  );
}

UpdateClient.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  client: PropTypes.shape().isRequired,
};

UpdateClient.defaultProps = {
  isOpen: false,
};
