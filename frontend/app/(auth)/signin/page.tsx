'use client';
import Link from 'next/link';

const Signin = () => {
  function handleSubmit() {
    console.log('submit');
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-col justify-center text-center w-2/5 items-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="flex flex-col gap-4 mt-12 w-4/5">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="rounded-md p-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-md p-4"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-400 rounded-md p-4 w-2/5 "
              >
                Sign In
              </button>
            </div>
          </form>
          <Link
            className="text-right hover:text-blue-500 font-semibold mr-4"
            href={'/signup'}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
