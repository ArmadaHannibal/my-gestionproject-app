import '@/styles/styleMembreDashboard.css';


export default function MembreLayout({
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
