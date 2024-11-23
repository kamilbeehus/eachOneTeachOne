export default function Error404Page() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center min-h-screen ">
        <div className="space-y-6 text-primary text-center font-bold text-2xl">
          <p>Oops something went wrong.</p>
          <p>We couldn&apos;t find the page you were looking for.</p>
          <div className="py-16"> Error 404 </div>
        </div>
      </div>
    </>
  );
}
