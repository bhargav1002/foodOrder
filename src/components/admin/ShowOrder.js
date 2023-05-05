import React, { useState, useEffect, useCallback } from 'react'
import Table from './Table';
import classes from './ShowOrder.module.css'

export default function ShowOrder() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://foodorder-e232d-default-rtdb.firebaseio.com/orders.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedOrders = [];

            for (const key in data) {
                const orderitem = [];
                const d = data[key].orderedItems
                for (const item in d) {
                    orderitem.push({
                        iname: d[item].name,
                        contity: d[item].amount,
                        price: d[item].price
                    })
                }
                loadedOrders.push({
                    id: key,
                    uname: data[key].user.name,
                    pinCode: data[key].user.pinCode,
                    street: data[key].user.street,
                    city: data[key].user.city,
                    items: [...orderitem]
                });
            }
            setOrders(loadedOrders);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    let content = <p>Found no orders.</p>;

    if (orders.length > 0) {
        content = <Table data={orders}></Table>;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }
    return (
        <div className={classes.orderdiv}>
            <div className={classes.card}>
                {content}
            </div>
        </div>
    )
}
