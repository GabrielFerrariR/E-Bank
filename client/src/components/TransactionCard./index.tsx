import ITransactions from '../../interfaces/ITransactions';
import cashinIcon from '../../assets/images/cashIn.svg';
import cashoutIcon from '../../assets/images/cashOut.svg';
import style from './style.module.css';

function TransactionCard({
  value, debitedAccount, creditedAccount, account, createdAt,
}: ITransactions & { account: number }) {
  const {
    user: { username: CreditedUsername },
  } = creditedAccount;
  const {
    id: debitedAccountId,
    user: { username: debitedAccountUserName },
  } = debitedAccount;
  const isCashOut = debitedAccountId === account;
  const createdDate = new Date(createdAt);

  return (
    <section className={style.card}>
      <img src={isCashOut ? cashoutIcon : cashinIcon} alt="tranfer-type" />
      <div className={style.card_header}>
        <h4>{isCashOut ? CreditedUsername : debitedAccountUserName }</h4>
        <p className="label-sm">{createdDate.toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' })}</p>
      </div>
      <h3 className={isCashOut ? style.cashOut : style.cashIn}>{Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
    </section>
  );
}

export default TransactionCard;
