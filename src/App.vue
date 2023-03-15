<script setup>
import { ref } from 'vue'
import DomainForm from './components/DomainForm.vue'
import ResultView from './components/ResultView.vue'

const emails = ref([])
const fileLink = ref('')

const generated = p => {
  emails.value = p.emails
  fileLink.value = p.fileLink
}
const clear = () => {
  emails.value = []
  fileLink.value = ''
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <DomainForm @generated="generated" @clear="clear" />
    </div>
  </header>

  <main>
    <ResultView v-if="emails.length > 0" :fileLink="fileLink" :emails="emails" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
