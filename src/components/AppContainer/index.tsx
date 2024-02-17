function AppContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-screen text-base font-medium">
      {children}
    </div>
  );
}

export default AppContainer;
