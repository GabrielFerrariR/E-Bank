import { ChangeEvent, useCallback, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useUsers from '../../hooks/useUsers';
import style from './style.module.css';
import { requestTransfer } from '../../services/api';
import { inputSx } from './styleSx';
import warningIcon from '../../assets/images/atention.svg';
import phoneIcon from '../../assets/images/phoneTransaction.svg';

const steps = ['Defina o valor da transferência', 'Escolha quem vai receber', 'Confirme a transferência'];

const defaultFormState = {
  amount: 0,
  addressee: '',
};

export default function TransactionStepper() {
  const [transferData, setTransferData] = useState({
    amount: 0,
    addressee: '',
  });
  const { amount, addressee } = transferData;
  const { filteredUsers } = useUsers();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    | SelectChangeEvent<string>) => {
      setTransferData({ ...transferData, [name]: value });
    },
    [transferData],
  );

  const handleSubmit = async () => {
    try {
      await requestTransfer({ addressee, amount });
      setSubmitMessage('Transferência concluída!');
      setIsSubmitted(true);
    } catch (err) {
      setSubmitMessage('Ocorreu um erro durante transferência, tente novamente mais tarde');
      setError(true);
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    setIsSubmitted(false);
    setActiveStep(0);
    setTransferData(defaultFormState);
    setError(false);
  };

  if (isSubmitted) {
    return (
      <section>
        {error
          ? <img src={warningIcon} alt="warning" />
          : <img src={phoneIcon} alt="phone" /> }
        <p>{submitMessage}</p>
        <button type="button" onClick={handleRestart}>Voltar</button>
      </section>
    );
  }

  return (
    <section>
      <p>
        {steps[activeStep]}
      </p>
      {activeStep === 0 && (
      <label htmlFor="username" className={style.label}>
        Valor:
        <input type="number" name="amount" id="amount" onChange={handleChange} value={amount} />
        <h3 className={style.currency}>R$</h3>
      </label>
      )}
      {activeStep === 1 && (
        <Select name="addressee" id="addressee" value={addressee} onChange={handleChange} sx={inputSx}>
          {filteredUsers.map((user) => (
            <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
          ))}
        </Select>
      )}
      {activeStep === 2 && (
        <p>
          Transferir
          {' '}
          {Number(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          para
          {' '}
          {addressee}
          {' '}
          ?
        </p>
      )}
      {activeStep !== 0 && <button type="button" onClick={handleBack}>Anterior</button>}
      {activeStep !== 2 && <button type="button" onClick={handleNext}>Próximo</button>}
      {activeStep === 2 && <button type="button" onClick={handleSubmit}>Confirmar</button>}
    </section>
  );
}
