import AccountSidebar from '@/components/parts/Sidebar/AccountSidebar';

const LayoutAccount = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh">
      <div className="flex flex-row">
        <AccountSidebar />

        <div className="flex flex-col w-full">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayoutAccount;
