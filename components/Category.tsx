export default function Category({ text }: { text: string }) {
  return (
    <span className="text-sm bg-blue-100 text-blue-700 p-1 px-2 rounded-md shadow">
      {text}
    </span>
  );
}
