import Avatar from '../components/sidebar/Avatar';
import Separator from '../components/sidebar/Separator';
import Sidebar from '../components/sidebar/Sidebar';
import ThemeToggle from '../components/themeToggle/ThemeToggle';
import './App.css';

function App() {

  return (
    <>
      <Sidebar>
        <ThemeToggle />
        <Separator />
        <Avatar />
      </Sidebar>
    </>
  );
}

export default App;
