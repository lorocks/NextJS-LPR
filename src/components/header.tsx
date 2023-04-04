function Header({ user }) {
  return (
    <div className="py-2 sticky top-0 flex items-center justify-center w-full text-red-800 font-bold bg-orange-400 ">
      Welcome {user}
    </div>
  );
}

export default Header;
