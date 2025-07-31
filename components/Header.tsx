import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <nav className="header-nav">
      <div className="left">
        <Link href="/" data-active={isActive('/')}>
          Feed
        </Link>
        {session && (
          <Link href="/drafts" data-active={isActive('/drafts')}>
            My drafts
          </Link>
        )}
      </div>

      <div className="right">
        {status === 'loading' ? (
          <p>Validating session...</p>
        ) : session ? (
          <>
            <span className="user-info">
              {session.user.name} ({session.user.email})
            </span>
            <Link href="/create" className="button">
              New post
            </Link>
            <button onClick={() => signOut()} className="button">
              Log out
            </button>
          </>
        ) : (
          <Link href="/api/auth/signin" className="button">
            Log in
          </Link>
        )}
      </div>

      <style jsx>{`
        .header-nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
        
        .left {
          display: flex;
          gap: 1rem;
        }
        
        .right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .left a, .right a, .right button {
          text-decoration: none;
          color: var(--geist-foreground);
          font-size:1rem;
        }
        
        .left a[data-active='true'] {
          color: gray;
        }
        
        .user-info {
          font-size: 13px;
          padding-right: 1rem;
        }
        
        .button {
          border: none;
          padding: 1rem 1rem;
          cursor: pointer;
          background: none;
        }
        
        .right button {
          background: none;
        }
      `}</style>
    </nav>
  );
};

export default Header;