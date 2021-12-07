import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Redirect = (props) => {
    let nav = useNavigate();
    let route = useLocation();

    useEffect(() => {
        if (route.pathname === '/create/account') {
            console.log(route);
            nav('/', { replace: true });
        }
    }, [props.user]);

    return null;
};

export default Redirect;
