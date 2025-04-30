import '@/styles/styleProfilDashboard.css';


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className='w-full px-10'>
        {children}
      </div>
  );
}
