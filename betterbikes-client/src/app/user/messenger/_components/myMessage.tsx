export default function MyMessage({ message }: { message: string }) {
  return (
    <>
      <div className="message me mb-4 flex text-right">
        <div className="flex-1 px-2">
          <div className="inline-block bg-main-accent rounded-xl p-2 px-6 text-white">
            <span>{message}</span>
          </div>
          <div className="pr-4">
            <small className="text-gray-500">15 April</small>
          </div>
        </div>
      </div>
    </>
  );
}
