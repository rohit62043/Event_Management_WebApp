import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'All Events',
            slug: '/all-events',
            active: authStatus,
        },
        {
            name: 'Add Event',
            slug: '/add-event',
            active: authStatus,
        },
        {
            name: 'User Profile',
            slug: '/user-profile',
            active: authStatus,
        },
    ];

    return (
        <header className="bg-gray-800 text-white shadow">
            <Container>
                <nav className="flex items-center justify-between py-4">
                    <div>
                        <Link to='/'>
                            <Logo width='120px' />
                        </Link>
                    </div>
                    <ul className="flex space-x-4">
                        {navItems.map((item) => item.active && (
                            <li key={item.name}>
                                <Link
                                    to={item.slug}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
