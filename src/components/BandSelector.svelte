<script>
  import { COLORS } from "./colors";

  export let band;
  export let bandColor;
</script>

<div class="band-option">
  <span>Banda {band}</span>
  <select bind:value={bandColor}>
    {#each Object.keys(COLORS) as color}
      <option value={COLORS[color]}>{color.toUpperCase()}</option>
    {/each}
  </select>
</div>

<style>
  .band-option {
    display: flex;
    align-items: center;
    width: 100%;
    max-height: 3rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .band-option span {
    font-size: 1rem;
  }
  .band-option select {
    height: 2rem;
    width: 6rem;
    font-size: 0.8rem;
    background: transparent;
    outline: none;
    color: white;
    background-color: transparent;
  }
  .band-option select option {
    background-color: #1a171e;
    color: white;
  }
</style>
