import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Header: React.FC = () => {
  const { isLoggedIn, logIn, logOut } = useContext(AuthContext);

  return (
    <header>
      <div className='company-name'>
        <div className='logo'>S</div>
        SuperSoft
      </div>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><button onClick={logIn}>Log In</button></li>
            <li><button onClick={logIn}>Sign up</button></li>
          </>
        ) : (
          <li><button onClick={logOut}>Log out</button></li>
        )}
      </ul>
    </header>
  );
};

export default Header;
