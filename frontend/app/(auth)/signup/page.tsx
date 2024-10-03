import Link from 'next/link';

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex flex-col justify-center text-center w-2/5 items-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="flex flex-col gap-4 mt-12 w-4/5">
          <input type="text" placeholder="Name" className="rounded-md p-4" />
          <input type="email" placeholder="Email" className="rounded-md p-4" />
          <input
            type="password"
            placeholder="Password"
            className="rounded-md p-4"
          />
          <div className="flex justify-center">
            <button className="bg-blue-400 rounded-md p-4 w-2/5 ">
              Sign Up
            </button>
          </div>
          <Link
            className="text-right hover:text-blue-500 font-semibold mr-4"
            href={'/signin'}
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
