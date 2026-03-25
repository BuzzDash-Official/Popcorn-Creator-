"use client";
import { ClerkProvider, SignInButton, Show, UserButton, useUser } from "@clerk/nextjs";
import { useState } from 'react';

export default function PopcornSaaS() {
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', borderBottom: '1px solid #1a1a1a', alignItems: 'center' }}>
        <div style={{ fontWeight: '900', letterSpacing: '3px', color: '#FFD700', fontSize: '1.2rem' }}>POPCORN CREATOR</div>
        <div>
          <Show when="signed-out"><SignInButton mode="modal"><button style={{ background: '#FFD700', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>CONNEXION GOOGLE</button></SignInButton></Show>
          <Show when="signed-in"><div style={{ display:'flex', alignItems:'center', gap:'15px' }}><span>{user?.firstName}</span><UserButton /></div></Show>
        </div>
      </nav>

      <main style={{ padding: '50px' }}>
        {!isSignedIn ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '900' }}>DOMINEZ <span style={{ color: '#FFD700' }}>L'ALGORITHME.</span></h1>
            <p style={{ color: '#666', fontSize: '1.5rem', maxWidth: '700px', margin: '20px auto' }}>Connectez votre chaîne YouTube et laissez notre IA piloter votre croissance.</p>
            <SignInButton mode="modal"><button style={{ marginTop: '30px', padding: '20px 50px', fontSize: '1.2rem', borderRadius: '50px', border: 'none', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Commencer l'ascension</button></SignInButton>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 1s ease' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Tableau de bord de Maîtrise</h2>
            
            {/* GRILLE DE STATS STYLE LUXE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>RÉTENTION MOYENNE</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFD700' }}>64.2% <span style={{ fontSize: '1rem', color: '#00ff00' }}>+4.1%</span></div>
              </div>
              <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>ABONNÉS GAGNÉS (24H)</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>+1,240</div>
              </div>
              <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>PERTE D'AUDIENCE</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff4444' }}>-12% <span style={{ fontSize: '0.8rem', color: '#666' }}>à 0:45s</span></div>
              </div>
            </div>

            {/* SECTION IA PREDICTIVE */}
            <div style={{ marginTop: '40px', background: 'linear-gradient(90deg, #111, #1a1a1a)', padding: '40px', borderRadius: '30px', border: '1px solid #333' }}>
              <h3 style={{ color: '#FFD700', marginBottom: '15px' }}>🔮 Prédictions de l'IA Popcorn</h3>
              <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                "D'après vos dernières données, votre prochaine vidéo sur le thème <b>'Business'</b> a 89% de chances de dépasser les 50k vues si vous publiez mardi à 18h. 
                <b> Attention :</b> Votre dernier titre était trop long, l'IA suggère : 'Le Secret des 1% enfin révélé'."
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
