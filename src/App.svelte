<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Band from "./components/Band.svelte";
  import BandSelector from "./components/BandSelector.svelte";
  import { Resistor } from "./components/colors";
  import Calculator from "./Calculator.svelte";

  const resistor = new Resistor();
</script>

<svelte:head>
  <title>Resistor</title>
</svelte:head>
<Router>
  <header>
    <nav class="links">
      <ul>
        <li><Link to="/">Bandas</Link></li>
        <li><Link to="calculator">Calculadora</Link></li>
      </ul>
      <img src="/images/logo.png" alt="logo" class="logo" />
    </nav>
  </header>
  <main>
    <Route path="/">
      <h1 class="title">Calculadora de resistencias</h1>
      <section class="resistor-container">
        <div class="wire" />
        <div class="bands-container">
          <Band color={resistor.band1} />
          <Band color={resistor.band2} />
          <Band color={resistor.band3} />
          <Band color={resistor.band4} />
        </div>
        <div class="wire" />
      </section>
      <p class="resistor-value">Valor: {resistor.value()}&Omega;</p>
      <section class="resistor-options">
        <BandSelector band={1} bind:bandColor={resistor.band1} />
        <BandSelector band={2} bind:bandColor={resistor.band2} />
        <BandSelector band={3} bind:bandColor={resistor.band3} />
      </section>
    </Route>
    <Route path="/calculator">
      <Calculator />
    </Route>
  </main>
  <footer>
    Creado por <a href="https://github.com/BloodBoy21">Alan B.</a> para
    ingeniería electrónica del <a href="http://itesco.edu.mx/">ITESCO</a>
  </footer>
</Router>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    color: #ffff;
  }
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .title {
    font-size: 2em;
    text-align: center;
    margin-bottom: 1em;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #1a171e;
    padding: 0.7rem;
  }
  header nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  header nav ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    gap: 0.5rem;
  }
  .links :global(a) {
    color: #ffff;
    text-decoration: none;
    font-size: 0.8em;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.2s ease-in-out;
  }
  .logo {
    width: 50px;
    position: relative;
    margin-left: auto;
  }
  main {
    text-align: center;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    position: relative;
    overflow: hidden;
    padding-top: 1.5rem;
    background-color: #330033;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='5.8'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='10'/%3E%3Ccircle cx='539' cy='269' r='10'/%3E%3Ccircle cx='603' cy='493' r='10'/%3E%3Ccircle cx='731' cy='737' r='10'/%3E%3Ccircle cx='520' cy='660' r='10'/%3E%3Ccircle cx='309' cy='538' r='10'/%3E%3Ccircle cx='295' cy='764' r='10'/%3E%3Ccircle cx='40' cy='599' r='10'/%3E%3Ccircle cx='102' cy='382' r='10'/%3E%3Ccircle cx='127' cy='80' r='10'/%3E%3Ccircle cx='370' cy='105' r='10'/%3E%3Ccircle cx='578' cy='42' r='10'/%3E%3Ccircle cx='237' cy='261' r='10'/%3E%3Ccircle cx='390' cy='382' r='10'/%3E%3C/g%3E%3C/svg%3E");
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  @media (max-width: 480px) {
    main {
      max-width: none;
    }
    .title {
      font-size: 1.4rem;
      text-align: center;
    }
  }
  /* Resistor  */
  .resistor-container {
    width: 100%;
    max-width: 300px;
    max-height: 200px;
    height: 80px;
    display: flex;
    gap: 10;
    align-items: center;
    justify-content: center;
  }
  .bands-container {
    display: flex;
    max-width: 300px;
    width: calc(100% - 10px);
    height: 100%;
    background-color: hsl(58, 90%, 80%);
    overflow: hidden;
    border-radius: 10px;
  }
  .wire {
    width: 100px;
    max-width: 200px;
    height: 10px;
    background-color: #e2e2e2;
  }
  /* Bands position */
  .bands-container > :global(:last-child) {
    margin-left: auto;
  }
  /* Resistor options */
  .resistor-options {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
  }
  .resistor-value {
    font-weight: bold;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    color: #fff;
    padding: 0.8em;
  }
</style>
