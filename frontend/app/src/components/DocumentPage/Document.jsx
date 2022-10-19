import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


export const Document = () => {
    let { id } = useParams()
    let {docs} = useSelector(state => state.docs)

    const document = docs.filter(item => item.id === Number(id))[0]
    console.log(document)
    return (
        <section>
            <h2>Информация о документе</h2>
            <div> 
                <ul>
                    <li>{document.title}</li>
                    <li>{document.description}</li>
                    <p>Заказчики документа</p>
                    { document.subscribe_workers.map(item => <li>{ item.id }</li>) }
                </ul>
            </div>
        </section>
    )
}