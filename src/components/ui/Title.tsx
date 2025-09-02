
export const Title = ({ children,className }: { children:React.ReactNode,className?:string }) => {
  return <h1 className={`text-2xl font-semibold ${className}`}>{children}</h1>;
};
