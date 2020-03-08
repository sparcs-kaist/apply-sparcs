export default function({ $axios, redirect }) {
  $axios.defaults.validateStatus = false;
}
