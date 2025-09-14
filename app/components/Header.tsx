"use client";
import Image from 'next/image';

export default function Header() {
	return (
		<header
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '2rem 0 1.5rem 0',
				position: 'relative',
				zIndex: 2,
			}}
		>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				gap: '1.2rem',
				animation: 'fadeInDown 1.2s cubic-bezier(.42,0,.58,1)',
			}}>
				<Image src="/globe.svg" alt="Wellness Logo" width={48} height={48} style={{filter: 'drop-shadow(0 2px 8px #a1c4fd)'}} />
				<h1 className="wellness-title" style={{margin: 0}}>
					Wellness App
				</h1>
			</div>
			<style jsx>{`
				@keyframes fadeInDown {
					0% { opacity: 0; transform: translateY(-32px); }
					100% { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</header>
	);
}
