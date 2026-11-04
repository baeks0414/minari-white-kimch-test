import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <NavLink to="/" end>홈</NavLink>
      <NavLink to="/store">가게</NavLink>
      <NavLink to="/me">내 정보</NavLink>
    </nav>
  );
}
