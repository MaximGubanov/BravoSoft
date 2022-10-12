import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
`;

const Navlist = styled.ul`
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    gap: 1rem;
    `;
    
const ListItem = styled.li`
    a {
        color: #AF99F5;
        transition: all 0.3s linear 0.1s;
    }
    &:hover a {
        color: #FBE991;
        transition: all 0.3s linear 0.1s;
    }
`;

export const Navbar = () => {
    return (
        <Nav>
            <Navlist>
                <ListItem>
                    <Link to='/'>Сводная таблица</Link>
                </ListItem>
                <ListItem>
                    <Link to='/users'>Пользователи</Link>
                </ListItem>
            </Navlist>
        </Nav>
    )
}