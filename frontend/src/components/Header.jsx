import React from 'react'

export default function Header() {
  return (
    <div className="bg-blue-500/60 w-full h-15 p-3 flex items-center justify-between">
      <div>
        <span className="font-bold text-2xl">HR Management System</span>
          </div>
          <div>
              <button className='border-2 border-blue-500 p-1 rounded-xl font-medium hover:bg-blue-500'>Logout</button>
          </div>
    </div>
  );
}
