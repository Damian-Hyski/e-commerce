export function FormContainer({ children, title }) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-custom-gradient">
        <h2 className="text-4xl font-black uppercase text-light">{title}</h2>
        <div className="shadow-custom-shadow h-fit w-1/5 min-w-80 bg-light p-6 text-xs font-medium uppercase">
          {children}
        </div>
      </div>
    </div>
  );
}
