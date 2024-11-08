type Props = React.PropsWithChildren;

const ProtectedPageLayout = ({ children }: Props) => {
  return (
    <div className="w-full py-3 px-6">
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
};

export default ProtectedPageLayout;
