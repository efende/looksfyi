import Navbar from './components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import TabNavigation from './components/TabNavigation';
import MasonryGrid from './components/MasonryGrid';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        <ProfileHeader />
        <TabNavigation />
        <MasonryGrid />
      </main>
    </div>
  );
}

export default App;
