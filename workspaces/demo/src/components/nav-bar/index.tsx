import { Link, NavLink } from 'react-router-dom'
import './index.scss'

export default () => {
    return (
        <nav className="menu">
            <NavLink className={res => res.isActive ? 'menu-item active' : 'menu-item'} to="/">Home</NavLink>
            <NavLink className={res => res.isActive ? 'menu-item active' : 'menu-item'} to="/live-canvas/live-canvas/red">Red Canvas</NavLink>
            <NavLink className={res => res.isActive ? 'menu-item active' : 'menu-item'} to="/live-canvas/live-canvas/blue">Blue Canvas</NavLink>
            <NavLink className={res => res.isActive ? 'menu-item active' : 'menu-item'} to="/live-canvas/live-canvas/yellow">Yellow Canvas</NavLink>
            <NavLink className={res => res.isActive ? 'menu-item active' : 'menu-item'} to="/about">About</NavLink>
        </nav>
    );
}