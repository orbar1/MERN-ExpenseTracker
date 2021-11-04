
import React , {useContext, useEffect} from 'react';
import Transaction from './Transaction';

import { GlobalContext } from '../context/GlobalState';

function TransactionList() {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(()=>{
        getTransactions();
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
            {transactions.map(transaction => (<div><h6 style={{fontSize:'12px'}}>{new Date(Date.parse(transaction.createdAt)).toDateString()}</h6><Transaction key={transaction.id} transaction={transaction} /></div>))}
            </ul>
        </>
    );

}

export default TransactionList;