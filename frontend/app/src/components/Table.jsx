import React from 'react';
import styled from 'styled-components'
import { RequestDocForm } from "./Forms"


const DocTable = styled.table`
border: 1px solid;
`
const Th = styled.th`
border: 1px solid grey;
`

const Td = styled.td`
border: 1px solid grey;
`
const DocItem = ({doc}) => {
    return (
        <tr>
            <Td>{doc.id}</Td>
            <Td>{doc.title}</Td>
            <Td>{doc.description}</Td>
            <Td>{doc.subscribe_workers.length}</Td>
        </tr>
    )
}

export const TableRequiests = ({docs, users}) => {

    const key = 'subscribe_workers'
    const sortedDocs = docs.sort((doc1, doc2) => doc1[key].length < doc2[key].length ? 1 : -1)

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <RequestDocForm users={ users } />
            </div>
            <DocTable>
                <thead>
                    <tr>
                        <Th>№</Th>
                        <Th>Наименование</Th>
                        <Th>Описание</Th>
                        <Th>Кол-во запросов</Th>
                    </tr>
                </thead>
                <tbody>
                    { sortedDocs.map((doc) => <DocItem doc={doc} key={doc.id} />) }
                </tbody>
            </DocTable>
        </div>
    )
}