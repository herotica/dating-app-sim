import Header from '../components/header';
import MobileLayout from '../components/mobile-layout';
import ProfileView from '../components/profile';

export default function Profile() {
  return (
    <MobileLayout>
      <div>
        <Header />
        <main className="max-h-[60vh] flex-1 overflow-hidden">
          <ProfileView
          hideDistance
            girl={{
              username: 'Mr M Chaddington',
              version: 1,
              name: 'Mark',
              age: 38,
              job: 'Trust Fund Waster',
              distance: 6,
              profile: {
                lookingfor: 'Cock Sleeve',
                tagline: 'Train, eat, play guitar, fuck.',
                interests: ['Rock music', 'Cats', 'Lube'],
                lifestyle: ['Partying', 'Hip thrusting', 'Travel', 'Crime']
              },
              pictures: ['male-profile.jpg', 'male-profile2.jpg', 'male-profile3.jpg', 'male-profile4.jpg'],
              apiSource: '/data'
            }}
          />
        </main>
      </div>
    </MobileLayout>
  );
}
