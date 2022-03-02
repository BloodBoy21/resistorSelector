<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let resistor;
  let resValue;
  let resMultiplier;
  function getResValue() {
    if (!resValue) {
      resValue = 0;
    }
    resistor.setValue(parseInt(resValue), parseInt(resMultiplier));
    dispatch("updateTotal");
  }
</script>

<div class="res-container">
  <input
    type="number"
    bind:value={resValue}
    on:change={getResValue}
    placeholder="Valor de la resistencia"
  />
  <select name="simbol" bind:value={resMultiplier} on:change={getResValue}>
    <option value="1" select>&Omega</option>
    <option value="1000">K&Omega</option>
    <option value="1000000">M&Omega;</option>
    <option value="1000000000">G&Omega;</option>
  </select>
</div>

<style>
  .res-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .res-container input {
    max-width: 200px;
    height: 30px;
    border-radius: 9px;
    border: 1px solid #ccc;
  }
  .res-container select {
    width: clamp(1rem, 2.5rem);
    height: 30px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid rgb(82, 82, 82);
  }
</style>
