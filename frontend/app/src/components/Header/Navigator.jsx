import { Link } from 'react-router-dom'

import './style.css'


export const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Сводная таблица</Link>
                </li>
                <li>
                    <Link to='/users'>Пользователи</Link>
                </li>
            </ul>
        </nav>
    )
}