export default function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4  rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm ">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-medium link-primary">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}
