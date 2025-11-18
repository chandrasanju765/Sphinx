// components/ScrollSections.jsx
import { Scroll, ScrollControls } from "@react-three/drei";

export function ScrollSections() {
  return (
    <Scroll html>
      <div style={{ 
        width: '100vw', 
        color: 'white',
        fontSize: '40px',
        fontWeight: 'bold'
      }}>
        {/* Section 1 */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'transparent'
        }}>
          <div>SECTION 1 - TERRAIN OVERVIEW</div>
        </section>
        
        {/* Section 2 */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'transparent'
        }}>
          <div>SECTION 2 - ANCIENT PYRAMIDS</div>
        </section>
        
        {/* Section 3 */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'transparent'
        }}>
          <div>SECTION 3 - COSMIC ENERGY</div>
        </section>
        
        {/* Section 4 */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'transparent'
        }}>
          <div>SECTION 4 - SPHINX GUARDIAN</div>
        </section>
      </div>
    </Scroll>
  );
}