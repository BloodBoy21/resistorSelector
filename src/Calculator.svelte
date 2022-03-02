<script>
  import ResistorValue from "./components/ResistorValue.svelte";
  import { storeFE } from "./calculatorStore";
  import { Calculator, Resistor } from "./calculatorStore";
  const calculator = new Calculator();
  calculator.addResistance(new Resistor(0, 1));
  calculator.addResistance(new Resistor(0, 1));
  $storeFE = [...calculator.resistors];
  function addResistor() {
    if ($storeFE.length > 9) return;
    const size = $storeFE.length;
    const res = new Resistor(0, 1);
    $storeFE[size] = res;
    calculator.addResistance(res);
  }
  function deleteResistor() {
    if ($storeFE.length < 3) return;
    $storeFE = $storeFE.splice(0, $storeFE.length - 1);
    calculator.deleteResistance();
    calculate();
  }
  function changeMode() {
    if (calculator.mode === "serie") {
      calculator.mode = "paralelo";
    } else {
      calculator.mode = "serie";
    }
    calculate();
  }
  let resTotal = "";
  function calculate() {
    resTotal = calculator.getEquivalence();
  }
</script>

<section>
  <div class="circuit-container">
    {#if calculator.mode === "serie"}
      <img
        src="https://www.digikey.com.mx/-/media/Images/Marketing/Resources/Calculator/res-series.png?la=es-MX&ts=683da814-c01a-4d6c-bc3c-3232c7e1554f"
        alt=""
        class="circuit"
      />
    {/if}
    {#if calculator.mode === "paralelo"}
      <img
        src="https://www.digikey.com.mx/-/media/Images/Marketing/Resources/Calculator/res-parallell.png?la=es-MX&ts=da84e479-b2db-4beb-ad8f-7786b0c44901"
        alt=""
        class="circuit"
      />
    {/if}
  </div>
  <p>
    {#if resTotal !== ""}
      {resTotal}&Omega
    {/if}
  </p>
  <div class="resistor-container">
    {#each $storeFE as resistor}
      <svelte:component
        this={ResistorValue}
        bind:resistor
        on:updateTotal={calculate}
      />
    {/each}
  </div>
  <div class="btn-container">
    <button class="opt-btn" on:click={changeMode}
      >{calculator.mode.toUpperCase()}</button
    >
    <button class="opt-btn" on:click={addResistor}>Añadir resistencia</button>
    <button class="opt-btn" on:click={deleteResistor}
      >Eliminar resistencia</button
    >
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
  .resistor-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    height: auto;
    margin: 1rem 0;
  }
  .opt-btn {
    width: clamp(100px, 180px);
    height: clamp(40px, 60px);
    background-color: #007ed8;
    color: white;
    font-size: 0.9rem;
    padding: 0.5rem;
    border: none;
    border-radius: 9px;
  }
  .opt-btn:hover {
    cursor: pointer;
    background-color: #00a2e8;
  }
  .circuit-container {
    width: 100%;
    height: auto;
    margin: 1rem;
  }
  .circuit {
    width: clamp(100px, 180px);
    height: clamp(100px, 180px);
    border-radius: 9px;
  }
  @media (max-width: 480px) {
    .opt-btn {
      font-size: 0.8rem;
    }
    .btn-container {
      margin-top: 0.8rem;
      height: auto;
    }
    :global(footer) {
      position: fixed;
    }
  }
</style>
