import React from 'react';
import BgVideo from '../BgVideo';
import Videos from '../Videos';
import Slider from '../Slider';
import Tiers from '../Tiers';
//import Maspopulares from '../Maspopulares';
import Nosotros from '../Nosotros';

function Home() {
  return (
    <div style={{ background: 'transparent' }}>
      <BgVideo />  
      <Videos />
      <Slider />
      <Tiers />
      {/*<Maspopulares />*/}
      <Nosotros />
    </div>
  );
}

export default Home;