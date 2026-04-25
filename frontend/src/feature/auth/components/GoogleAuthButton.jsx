import React from 'react';

function GoogleAuthButton() {
  return (
    <>
      <a
        href="/api/auth/google"
        aria-label="Continue with Google"
        className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer no-underline font-[Manrope,sans-serif]"
      >
        <span className="flex h-5 w-5 items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="h-5 w-5" role="presentation">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.652 32.657 29.379 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.038l5.657-5.657C34.032 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.038l5.657-5.657C34.032 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.161 0 9.86-1.977 13.388-5.197l-6.173-5.212C29.114 35.091 26.715 36 24 36c-5.358 0-9.624-3.326-11.286-8.027l-6.522 5.025C9.513 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.106 3.118-3.347 5.654-6.088 7.591l.002-.001 6.173 5.212C34.924 39.091 40 34 40 24c0-1.341-.138-2.651-.389-3.917z" />
          </svg>
        </span>
        <span>Continue with Google</span>
      </a>
    </>
  );
}

export default GoogleAuthButton;