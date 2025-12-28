import Link from "next/link";

export default function Navbar() {
  return (
    <div>
     
      {/* Snapchat Nav */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#FFFC00" stroke="#000" strokeWidth="0.5">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.49.077.047.16.099.245.153.551.354 1.236.793 1.536 1.372.457.879-.088 1.704-.688 2.134-.344.244-.593.403-.761.508.08.139.187.334.324.605.568 1.123 1.455 2.864.516 4.581-.863 1.578-2.818 2.465-5.266 2.465-1.397 0-2.675-.353-3.6-.82-.143-.072-.279-.148-.409-.226-.13.078-.266.154-.409.226-.925.467-2.203.82-3.6.82-2.448 0-4.403-.887-5.266-2.465-.939-1.717-.052-3.458.516-4.581.137-.271.244-.466.324-.605-.168-.105-.417-.264-.761-.508-.6-.43-1.145-1.255-.688-2.134.3-.579.985-1.018 1.536-1.372.085-.054.168-.106.245-.153a62.678 62.678 0 0 1-.03-.49l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.86 1.068 11.216.793 12.206.793z" />
              </svg>
            </Link>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/map" className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
  <div className="p-2">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  </div>
  <span className="text-xs font-semibold text-gray-900">Map</span>
</Link>


            <Link href="/spotlight" className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
              <div className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-900">Spotlight</span>
            </Link>

            <Link href="/chat" className="flex flex-col items-center gap-1 relative hover:opacity-70 transition-opacity">
              <div className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="absolute top-1 right-1 w-2 h-2 bg-snapchat-blue rounded-full" />
              <span className="text-xs font-semibold text-gray-900">Chat</span>
            </Link>

            <Link href="/lenses" className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
              <div className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-900">Lenses</span>
            </Link>

            <Link href="/snapchat-plus" className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity">
              <div className="p-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FFFC00" stroke="#000" strokeWidth="0.5">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.49.077.047.16.099.245.153.551.354 1.236.793 1.536 1.372.457.879-.088 1.704-.688 2.134-.344.244-.593.403-.761.508.08.139.187.334.324.605.568 1.123 1.455 2.864.516 4.581-.863 1.578-2.818 2.465-5.266 2.465-1.397 0-2.675-.353-3.6-.82-.143-.072-.279-.148-.409-.226-.13.078-.266.154-.409.226-.925.467-2.203.82-3.6.82-2.448 0-4.403-.887-5.266-2.465-.939-1.717-.052-3.458.516-4.581.137-.271.244-.466.324-.605-.168-.105-.417-.264-.761-.508-.6-.43-1.145-1.255-.688-2.134.3-.579.985-1.018 1.536-1.372.085-.054.168-.106.245-.153a62.678 62.678 0 0 1-.03-.49l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.86 1.068 11.216.793 12.206.793z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-900">Snapchat+</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

           

            <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
              Download
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
