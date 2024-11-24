const Logo = () => {
  return (
    <div className="logo-box">
        <img src="/images/logo.svg" alt="logo" className='logo-img' data-testid='logo-img' />
        <div className="logo-inner-box" data-testid="logo-inner-box"></div>
    </div>
  );
};

export default Logo;