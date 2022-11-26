import { ChangeEvent, useCallback, useState } from 'react';
import style from './style.module.css';
import { requestTransfer } from '../../services/api';
import warningIcon from '../../assets/images/atention.svg';
import phoneIcon from '../../assets/images/phoneTransaction.svg';

const steps = ['Defina o valor da transferência:', 'Escolha quem vai receber:', 'Confirme a transferência:'];

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
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <section className={style.submit_info_container}>
        {error
          ? <img src={warningIcon} alt="warning" />
          : <img src={phoneIcon} alt="phone" /> }
        <p>{submitMessage}</p>
        <button type="button" onClick={handleRestart} className={style.button}>Voltar</button>
      </section>
    );
  }

  return (
    <section className={style.stepper_container}>
      <p>
        {steps[activeStep]}
      </p>
      {activeStep === 0 && (
      <label htmlFor="amount" className={style.label}>
        Valor:
        <input type="number" name="amount" id="amount" onChange={handleChange} value={amount} className={style.input} />
        <h3 className={style.currency}>R$</h3>
      </label>
      )}
      {activeStep === 1 && (
        <label htmlFor="addressee" className={style.label}>
          Usuário:
          <input type="text" name="addressee" id="addressee" onChange={handleChange} value={addressee} />
        </label>
      )}
      {activeStep === 2 && (
        <p>
          Transferir
          {' '}
          {Number(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          {' '}
          para
          {' '}
          {addressee}
          {' '}
          ?
        </p>
      )}
      <section className={style.stepper_btn_container}>
        {activeStep !== 0 && <button type="button" onClick={handleBack} className={style.button}>Anterior</button>}
        {activeStep !== 2 && <button type="button" onClick={handleNext} className={style.button}>Próximo</button>}
        {activeStep === 2 && <button type="button" onClick={handleSubmit} className={style.button}>Confirmar</button>}
      </section>
    </section>
  );
}
