function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:shadow-signUp "
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
