import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import AddClient from '~/components/Modal/Add';
import UpdateClient from '~/components/Modal/Update';
import DialogDelete from '~/components/Dialog/Delete';
import { clientInRequest } from '~/store/modules/client/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Thomas Ferreira made with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material UI
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

// eslint-disable-next-line no-unused-vars
const data = [
  {
    id: '5fdfc2873fb7d842bc0b6bf2',
    name: 'Thomas Ferreira',
    cpfCnpj: '09678443473',
    blackList: true,
    date: '2020-12-20T21:30:38+00:00',
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openModalAddClient, setOpenModalAddClient] = useState(false);
  const [openModalUpdateClient, setOpenModalUpdateClient] = useState(false);
  const [openDialogDeleteClient, setOpenDialogDeleteClient] = useState(false);
  const [client, setClient] = useState(null);

  const clientsData = useSelector((state) => state.clients.data);

  useEffect(() => {
    if (!clientsData) {
      dispatch(clientInRequest());
    }
  }, [dispatch, clientsData]);

  const handleCloseModalAddClient = () => {
    setOpenModalAddClient(false);
  };

  const handleCloseModalUpdateClient = () => {
    setClient(null);
    setOpenModalUpdateClient(false);
  };

  const handleCloseDialogDelete = () => {
    setClient(null);
    setOpenDialogDeleteClient(false);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h4">
        Neoway
      </Typography>
      <div className={classes.table}>
        <MaterialTable
          title="Clientes"
          columns={[
            { title: 'Nome', field: 'name' },
            { title: 'CPF / CNPJ', field: 'cpfCnpj' },
            {
              title: 'Black List',
              field: 'blackList',
              lookup: { true: 'Sim', false: 'Não' },
            },
          ]}
          data={JSON.parse(JSON.stringify(clientsData)) || []}
          actions={[
            {
              icon: 'add',
              tooltip: 'Adicionar',
              isFreeAction: true,
              onClick: () => {
                setOpenModalAddClient(true);
              },
            },
            {
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (event, rowData) => {
                setClient(rowData);
                setOpenModalUpdateClient(true);
              },
            },
            {
              icon: 'delete',
              tooltip: 'Excluir',
              onClick: (event, rowData) => {
                setClient(rowData);
                setOpenDialogDeleteClient(true);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            toolbar: { searchPlaceholder: 'Pesquisar' },
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'linhas',
              previousTooltip: 'Página Anterior',
              nextTooltip: 'Proxima Página',
              lastTooltip: 'Ultima Página',
              firstTooltip: 'Primeira Página',
            },
          }}
        />
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
      {openModalAddClient && (
        <AddClient
          isOpen={openModalAddClient}
          handleClose={handleCloseModalAddClient}
        />
      )}
      {openModalUpdateClient && (
        <UpdateClient
          isOpen={openModalUpdateClient}
          handleClose={handleCloseModalUpdateClient}
          client={client}
        />
      )}
      {openDialogDeleteClient && (
        <DialogDelete
          isOpen={openDialogDeleteClient}
          handleClose={handleCloseDialogDelete}
          client={client}
        />
      )}
    </div>
  );
}
