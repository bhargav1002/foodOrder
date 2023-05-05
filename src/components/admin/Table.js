import React from 'react'

function OrderItem(props) {
    const data = props.data
    const items = data.items
    
    const bill = []
    for (const item in items) {
        bill.push(items[item].price * items[item].contity)
    }
    let TottalBill = 0;
    for (const element of bill) {
        TottalBill += element;
    }

    const col = items.map(i => {
        return (
            <div key={i.iname} className='pb-2'>
                <div><strong>Item: </strong>{i.iname}</div>
                <div><strong>Contity: </strong>{i.contity}</div>
                <div><strong>Price for that: </strong> ₹ {i.price * i.contity} </div>
            </div>
        )
    })
    return (
        <>
            {col}
            <div className='text-xl'>Total Bill: <strong>₹ {TottalBill}</strong></div>
        </>
    )
}

export default function Table(props) {
    return (
        <>
            <p className='text-4xl font-bold text-black text-center mb-2'>Orders</p>
            {
                props.data.map(d => {
                    return (
                        <>
                        <div key={d.id} className='grid grid-cols-3 py-2'>
                                <div className='col-span-2'>
                                <div className='text-lg'><strong>Ordrt id:</strong> {d.id}</div>
                                <div><strong>User Name:</strong> {d.uname}</div>
                                <div><strong>User Address:</strong> {d.street},{d.city},{d.pinCode}</div>
                            </div>
                            <div>
                            <OrderItem data={d}></OrderItem>
                            </div>
                        </div>
                        <hr />
                        </>
                    )
                })
            }
        </>
    )
}
