<script setup>
import { onMounted, ref } from 'vue'
import { useConverterStore } from '@/stores/converter'

const { usernames, setUsernames, resetUsernames, convert, resetEmails } = useConverterStore()

onMounted(() => {
  const input = document.querySelector('input')
  input?.addEventListener('keyup', names, false)
  input.value = usernames
  const btn = document.querySelector('.reset')
  btn?.addEventListener(
    'click',
    () => {
      resetUsernames()
      input.value = usernames
    },
    false
  )
})

const inP = ref(false)
const msg = ref('Domain to Email generator')

const changeMsg = val => {
  setTimeout(() => {
    msg.value = 'Domain to Email generator'
  }, 10000)
  msg.value = val
}

const emits = defineEmits(['generated', 'clear'])

const clear = () => {
  resetEmails()
  emits('clear')
}
const names = e => {
  const v = e.target.value
  setUsernames(v)
}

const generate = async () => {
  const domains = document.querySelector('textarea').value
  if (inP.value) {
    return
  }
  if (typeof domains !== 'string') {
    changeMsg('only links are supported')
    return
  }
  if (domains.length < 5) {
    changeMsg('domain too short')
    return
  }
  inP.value = true
  const { emails, fileLink } = await convert(domains)
  emits('generated', { emails, fileLink })
  inP.value = false
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <label>Usernames</label><br />
      <input /> &nbsp; &nbsp;
      <button class="reset">Reset</button>
      <hr />
      <br />
    </div>
    <p>Paste links directly from search engine or the 
      actual domain. Separate each with a comma.</p>
    <textarea rows="4" placeholder="samuel.site"></textarea>
    <br />
    <button @click="generate">Generate Emails</button>
    &nbsp; &nbsp;
    <button @click="clear">Clear</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

textarea,
input {
  width: 94%;
  margin: 10px auto;
  max-width: 780px;
}
input {
  padding: 5px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

label {
  width: 100%;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
